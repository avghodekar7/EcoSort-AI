# EcoSort-AI# 🌱 EcoSort AI – AI-Powered Waste Segregation Assistant

EcoSort AI is an AI-powered waste segregation assistant designed to help users identify everyday waste and receive simple, responsible disposal guidance.

The project uses **Google Gemini AI** to analyze waste based on either a text description or an uploaded image. It provides practical information about the waste category, recyclability, recommended action, bin/collection guidance, environmental impact, and a sustainability tip.

## 🎯 Sustainable Development Goals

### Primary SDG – SDG 12: Responsible Consumption and Production

EcoSort AI supports responsible waste handling by helping users make better decisions about how everyday waste should be segregated and disposed of.

### Secondary SDG – SDG 11: Sustainable Cities and Communities

Better waste segregation can contribute to cleaner communities and more sustainable urban waste-management practices.

---

## ❓ Problem Statement

Many people are unsure about how to correctly segregate common household and everyday waste. Incorrect disposal can lead to recyclable materials being mixed with general waste and can make responsible waste management more difficult.

**How might we use AI to simplify waste identification and segregation guidance so that everyday waste disposal can become more sustainable?**

---

## 💡 Proposed Solution

EcoSort AI provides an easy-to-use interface where users can:

* Enter the name or description of a waste item.
* Upload an image of a waste item.
* Use AI to analyze the provided information.
* Receive concise waste segregation and disposal guidance.

The system is designed as a decision-support tool rather than a replacement for local waste-management authorities.

---

## ✨ Key Features

### 📝 Text-Based Analysis

Users can enter a waste item such as:

* Plastic bottle
* Banana peel
* Newspaper
* Aluminum can
* Cardboard box

The AI analyzes the item and provides relevant waste-management guidance.

### 📷 Image-Based Analysis

Users can upload an image of a waste item.

The AI analyzes the image and attempts to identify the main waste item before providing segregation guidance.

### ♻️ Waste Classification

The AI provides information including:

* Waste item
* Waste category
* Recyclability
* Recommended action
* Bin/collection guidance
* Environmental impact
* Sustainability tip

### 🤖 AI-Powered Decision Support

Google Gemini is used as the AI model to analyze text and multimodal image inputs and generate structured waste-management guidance.

### ⚖️ Responsible AI

EcoSort AI considers responsible AI principles by:

* Indicating uncertainty when classification is unclear.
* Avoiding unsupported numerical environmental claims.
* Avoiding assumptions about specific local municipal rules.
* Providing practical guidance without unsafe recommendations.
* Keeping the API key private on the server side.

---

## 🔄 How EcoSort AI Works

```text
                 User
                  │
          ┌───────┴────────┐
          │                │
     Text Input       Image Upload
          │                │
          └───────┬────────┘
                  │
                  ▼
           Flask Backend
                  │
                  ▼
            Gemini AI
                  │
                  ▼
        Waste Classification
                  │
                  ▼
       Structured AI Response
                  │
                  ▼
          User-Friendly Result
```

---

## 🧠 AI Workflow

1. The user provides a waste item through text or an image.
2. The Flask backend receives the input.
3. A structured prompt is sent to the Gemini API.
4. Gemini analyzes the waste item.
5. The AI returns structured information in JSON format.
6. The Flask backend processes the response.
7. The result is displayed to the user through the web interface.

---

## 🛠️ Technologies Used

| Technology        | Purpose                                |
| ----------------- | -------------------------------------- |
| HTML              | Website structure                      |
| CSS               | User interface and styling             |
| JavaScript        | Frontend interaction and API requests  |
| Python            | Backend programming                    |
| Flask             | Web application backend                |
| Google Gemini API | AI-powered waste analysis              |
| JSON              | Structured AI responses                |
| Git & GitHub      | Version control and project repository |

---

## 📁 Project Structure

```text
EcoSort-AI/
│
├── app.py
├── requirements.txt
├── .gitignore
│
├── static/
│   ├── script.js
│   └── style.css
│
├── templates/
│   └── index.html
│
└── README.md
```

> The `.env` file containing the Gemini API key is intentionally excluded from the repository for security.

---

## 🚀 How to Run the Project Locally

### 1. Clone the repository

```bash
git clone https://github.com/avghodekar7/EcoSort-AI.git
```

### 2. Navigate to the project

```bash
cd EcoSort-AI
```

### 3. Create a virtual environment

```bash
python -m venv venv
```

### 4. Activate the virtual environment

**Windows PowerShell:**

```powershell
venv\Scripts\Activate.ps1
```

### 5. Install dependencies

```bash
pip install -r requirements.txt
```

### 6. Create the `.env` file

Create a file named:

```text
.env
```

Add your Gemini API key:

```text
GEMINI_API_KEY=your_api_key_here
```

Do not share or commit this file.

### 7. Run the application

```bash
python app.py
```

Open the local address shown in the terminal, usually:

```text
http://127.0.0.1:5000
```

---

## 🧪 Testing

The application was tested using different types of waste through both text and image analysis.

### Example Text Inputs

* Banana peel
* Plastic bottle
* Newspaper
* Aluminum can
* Glass bottle
* Cardboard box
* Used tissue
* Food leftovers
* Battery
* Electronic waste

### Example Image Inputs

* Plastic bottle
* Banana peel
* Newspaper
* Aluminum can
* Cardboard

The application was also tested for empty inputs, image selection, clearing results, and repeated analysis.

---

## ⚖️ Responsible AI Considerations

EcoSort AI is designed with responsible AI principles in mind.

### Fairness

The system aims to provide consistent waste-analysis guidance across different types of users and inputs.

### Transparency

The application clearly presents the AI-generated analysis rather than hiding how the recommendation is produced.

### Privacy

Images are provided by the user for analysis, and the Gemini API key is stored as a private environment variable rather than being exposed in the source code.

### Uncertainty

When the AI cannot confidently identify an item, the system is instructed to communicate uncertainty instead of presenting an uncertain classification as a fact.

### Safety

The AI is instructed to avoid unsafe disposal recommendations and not to invent specific local municipal rules.

---

## 🌍 Expected Impact

EcoSort AI aims to make waste segregation easier and more understandable for everyday users.

Potential benefits include:

* Improved awareness of waste categories.
* Better understanding of recyclable and non-recyclable materials.
* Encouragement of responsible disposal habits.
* Support for cleaner communities.
* Increased awareness of sustainable consumption and production practices.

The project is intended as an **AI-assisted educational and decision-support tool**, not as a complete replacement for official waste-management systems.

---

## 🔮 Future Scope

Future versions of EcoSort AI could include:

* Location-specific waste-management guidance.
* Support for multiple languages.
* Expanded waste-category detection.
* Integration with local recycling and collection information.
* User awareness and educational resources.
* Improved handling of ambiguous or mixed-waste images.
* Analytics for understanding common waste patterns.

---

## 👩‍💻 Project

**EcoSort AI – AI for Sustainability**

**Primary SDG:** SDG 12 – Responsible Consumption and Production

**Secondary SDG:** SDG 11 – Sustainable Cities and Communities

Developed as part of the **1M1B AI for Sustainability Virtual Internship**.

---

## 📌 Disclaimer

AI-generated waste classification and disposal guidance may not always be accurate. Waste-management rules and collection systems vary by location. Users should follow their local municipal or authorized waste-management guidelines when available.
