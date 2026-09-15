let isAnalyzing = false;

function displayResult(data) {
    const result = document.getElementById("result");

    result.innerHTML =
        '<div class="result-grid">' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '🗑️ <strong>Waste Item</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.waste_item +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '♻️ <strong>Category</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.category +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '🔄 <strong>Recyclability</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.recyclability +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '✅ <strong>Recommended Action</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.recommended_action +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '🗂️ <strong>Bin / Collection</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.bin_collection +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '🌍 <strong>Environmental Impact</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.environmental_impact +
                '</div>' +
            '</div>' +

            '<div class="result-section">' +
                '<div class="result-title">' +
                    '💡 <strong>Sustainability Tip</strong>' +
                '</div>' +
                '<div class="result-content">' +
                    data.sustainability_tip +
                '</div>' +
            '</div>' +

        '</div>';
}


/* =========================
   IMAGE PREVIEW
========================= */

function previewImage() {
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    if (!imageInput || !imagePreview || !imagePreviewContainer) {
        return;
    }

    if (imageInput.files.length === 0) {
        imagePreview.src = "";
        imagePreviewContainer.classList.add("hidden");
        return;
    }

    const image = imageInput.files[0];
    const reader = new FileReader();

    reader.onload = function(event) {
        imagePreview.src = event.target.result;
        imagePreviewContainer.classList.remove("hidden");
    };

    reader.readAsDataURL(image);
}


/* =========================
   TEXT ANALYSIS
========================= */

async function analyzeWaste() {
    if (isAnalyzing) {
        return;
    }

    const input = document.getElementById("wasteInput");
    const loading = document.getElementById("loading");
    const resultCard = document.getElementById("resultCard");
    const error = document.getElementById("error");
    const clearButton = document.getElementById("clearButton");

    const wasteItem = input.value.trim();

    if (!wasteItem) {
        error.textContent = "Please enter a waste item first.";
        error.classList.remove("hidden");
        return;
    }

    isAnalyzing = true;

    error.classList.add("hidden");
    resultCard.classList.add("hidden");

    if (clearButton) {
        clearButton.classList.add("hidden");
    }

    loading.classList.remove("hidden");

    try {
        const response = await fetch("/analyze", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                waste_item: wasteItem
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to analyze the waste item."
            );
        }

        displayResult(data.result);

        loading.classList.add("hidden");
        resultCard.classList.remove("hidden");

        if (clearButton) {
            clearButton.classList.remove("hidden");
        }

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (err) {
        loading.classList.add("hidden");

        error.textContent =
            err.message || "Unable to analyze the waste item.";

        error.classList.remove("hidden");

    } finally {
        isAnalyzing = false;
    }
}


/* =========================
   IMAGE ANALYSIS
========================= */

async function analyzeImage() {
    if (isAnalyzing) {
        return;
    }

    const imageInput = document.getElementById("imageInput");
    const loading = document.getElementById("loading");
    const resultCard = document.getElementById("resultCard");
    const error = document.getElementById("error");
    const clearButton = document.getElementById("clearButton");

    if (!imageInput || imageInput.files.length === 0) {
        error.textContent = "Please select an image first.";
        error.classList.remove("hidden");
        return;
    }

    isAnalyzing = true;

    error.classList.add("hidden");
    resultCard.classList.add("hidden");

    if (clearButton) {
        clearButton.classList.add("hidden");
    }

    loading.classList.remove("hidden");

    const image = imageInput.files[0];

    const formData = new FormData();
    formData.append("image", image);

    try {
        const response = await fetch("/analyze-image", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                data.error || "Unable to analyze the image."
            );
        }

        displayResult(data.result);

        loading.classList.add("hidden");
        resultCard.classList.remove("hidden");

        if (clearButton) {
            clearButton.classList.remove("hidden");
        }

        resultCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    } catch (err) {
        loading.classList.add("hidden");

        error.textContent =
            err.message || "Unable to analyze the image.";

        error.classList.remove("hidden");

    } finally {
        isAnalyzing = false;
    }
}


/* =========================
   CLEAR / RESET
========================= */

function clearAnalysis() {
    const wasteInput =
        document.getElementById("wasteInput");

    const imageInput =
        document.getElementById("imageInput");

    const imagePreview =
        document.getElementById("imagePreview");

    const imagePreviewContainer =
        document.getElementById("imagePreviewContainer");

    const resultCard =
        document.getElementById("resultCard");

    const clearButton =
        document.getElementById("clearButton");

    const error =
        document.getElementById("error");

    const loading =
        document.getElementById("loading");

    if (wasteInput) {
        wasteInput.value = "";
    }

    if (imageInput) {
        imageInput.value = "";
    }

    if (imagePreview) {
        imagePreview.src = "";
    }

    if (imagePreviewContainer) {
        imagePreviewContainer.classList.add("hidden");
    }

    resultCard.classList.add("hidden");
    clearButton.classList.add("hidden");
    error.classList.add("hidden");
    loading.classList.add("hidden");

    const analyzerCard =
        document.querySelector(".analyzer-card");

    if (analyzerCard) {
        analyzerCard.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}