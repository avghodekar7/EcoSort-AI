from flask import Flask, render_template, request, jsonify
from google import genai
from dotenv import load_dotenv
import os
import time
import json

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

MODEL_NAME = "gemini-3.6-flash"


def generate_with_retry(prompt, image_data=None, mime_type=None):
    for attempt in range(3):
        try:

            if image_data:
                contents = [
                    prompt,
                    {
                        "inline_data": {
                            "mime_type": mime_type,
                            "data": image_data
                        }
                    }
                ]
            else:
                contents = prompt

            response = client.models.generate_content(
                model=MODEL_NAME,
                contents=contents
            )

            return response.text

        except Exception as e:

            error_message = str(e)

            print(f"Gemini attempt {attempt + 1} failed:")
            print(error_message)

            if "503" in error_message or "UNAVAILABLE" in error_message:

                if attempt < 2:
                    time.sleep(2)
                    continue

            raise e


def create_prompt(waste_item=None):
    if waste_item:
        item_description = f"Waste item provided by the user: {waste_item}"
    else:
        item_description = "Identify the main waste item visible in the uploaded image."

    return f"""
You are EcoSort AI, an AI-powered waste segregation assistant.

{item_description}

Return ONLY valid JSON.
Do not use Markdown.
Do not add explanations outside the JSON.

Use exactly these keys:

{{
    "waste_item": "",
    "category": "",
    "recyclability": "",
    "recommended_action": "",
    "bin_collection": "",
    "environmental_impact": "",
    "sustainability_tip": ""
}}

Rules:
- Keep every value concise and practical.
- Identify the waste item only when reasonably confident.
- If classification is uncertain, clearly mention the uncertainty.
- Do not invent specific local municipal rules.
- Waste disposal systems vary by location.
- Avoid unsupported statistics or exact numerical environmental claims.
- Do not make unsafe recommendations.
"""


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/analyze", methods=["POST"])
def analyze():

    try:

        data = request.get_json()
        waste_item = data.get("waste_item", "").strip()

        if not waste_item:
            return jsonify({
                "error": "Please enter a waste item."
            }), 400

        prompt = create_prompt(waste_item)

        raw_result = generate_with_retry(prompt)

        result = json.loads(raw_result)

        return jsonify({
            "result": result
        })

    except json.JSONDecodeError:

        print("JSON ERROR: Gemini did not return valid JSON.")

        return jsonify({
            "error": "The AI returned an unexpected response. Please try again."
        }), 500

    except Exception as e:

        print("TEXT ANALYSIS ERROR:", repr(e))

        return jsonify({
            "error": "Gemini is temporarily busy. Please try again in a few seconds."
        }), 503


@app.route("/analyze-image", methods=["POST"])
def analyze_image():

    try:

        if "image" not in request.files:
            return jsonify({
                "error": "Please upload an image."
            }), 400

        image = request.files["image"]

        if image.filename == "":
            return jsonify({
                "error": "Please select an image."
            }), 400

        image_data = image.read()

        prompt = create_prompt()

        raw_result = generate_with_retry(
            prompt,
            image_data=image_data,
            mime_type=image.mimetype
        )

        result = json.loads(raw_result)

        return jsonify({
            "result": result
        })

    except json.JSONDecodeError:

        print("IMAGE JSON ERROR: Gemini did not return valid JSON.")

        return jsonify({
            "error": "The AI returned an unexpected response. Please try again."
        }), 500

    except Exception as e:

        print("IMAGE ANALYSIS ERROR:", repr(e))

        return jsonify({
            "error": "Gemini is temporarily busy. Please try again in a few seconds."
        }), 503


if __name__ == "__main__":
    app.run(debug=True)