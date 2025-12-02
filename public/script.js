const inputText = document.getElementById("inputText");
const translateBtn = document.getElementById("translateBtn");
const clearBtn = document.getElementById("clearBtn");
const resultDiv = document.getElementById("result");
const statusDiv = document.getElementById("status");

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    statusDiv.textContent = "اكتب نصًا للترجمة أولاً.";
    statusDiv.className = "status error";
    return;
  }

  resultDiv.textContent = "";
  statusDiv.textContent = "جاري الترجمة...";
  statusDiv.className = "status loading";

  try {
    const res = await axios.post("/translate", { text });

    if (res.data.translation) {
      resultDiv.textContent = res.data.translation;
      statusDiv.textContent = "تمت الترجمة بنجاح ✅";
      statusDiv.className = "status";
    } else {
      resultDiv.textContent = "لم أستطع جلب الترجمة.";
      statusDiv.textContent = "حدث خطأ غير متوقع.";
      statusDiv.className = "status error";
    }
  } catch (err) {
    console.error(err);
    resultDiv.textContent = "تعذر الاتصال بالخادم.";
    statusDiv.textContent = "تحقق من السيرفر أو الاتصال بالإنترنت.";
    statusDiv.className = "status error";
  }
});

clearBtn.addEventListener("click", () => {
  inputText.value = "";
  resultDiv.textContent = "الترجمة ستظهر هنا...";
  statusDiv.textContent = "";
  statusDiv.className = "status";
});
