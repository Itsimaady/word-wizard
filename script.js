document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("searchBtn");
  const input = document.getElementById("wordInput");
  const resultDiv = document.getElementById("result");

  searchBtn.addEventListener("click", async () => {
    const word = input.value.trim();
    resultDiv.innerHTML = "";

    if (!word) {
      resultDiv.innerHTML = "<p>Please enter a word to search.</p>";
      return;
    }

    resultDiv.innerHTML = "<p>🔍 Searching...</p>";

    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!res.ok) {
        throw new Error("No definition found.");
      }

      const data = await res.json();
      const wordData = data[0];
      const def = wordData.meanings[0].definitions[0];
      const audio = wordData.phonetics[0]?.audio || "";

      resultDiv.innerHTML = `
        <h2>${wordData.word}</h2>
        <p><strong>Part of Speech:</strong> ${wordData.meanings[0].partOfSpeech}</p>
        <p><strong>Definition:</strong> ${def.definition}</p>
        ${def.example ? `<p><strong>Example:</strong> "${def.example}"</p>` : ""}
        ${audio ? `<audio controls src="${audio}"></audio>` : ""}
      `;
    } catch (err) {
      resultDiv.innerHTML = `<p>❌ Could not find a definition for "<b>${word}</b>". Please try another word.</p>`;
    }
  });
});
