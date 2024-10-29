// Zadanie 1: Wybierz niezbędne elementy DOM
// Przykład: Musisz uzyskać odniesienia do elementów takich jak input pliku, przycisk, img i canvas.
// Wskazówka: Użyj document.getElementById lub podobnych metod, aby uzyskać elementy po ich ID.

// Zadanie 2: Dodaj nasłuchiwacz zdarzeń dla przesyłania obrazu
// Kiedy użytkownik wybierze obraz, wyświetl go w elemencie <img>.
// Wskazówka: Możesz użyć API FileReader, aby odczytać plik jako URL danych.

// Zadanie 3: Dodaj nasłuchiwacz zdarzeń do przycisku „Konwertuj na odcienie szarości”
// Po kliknięciu, skonwertuj wyświetlany obraz na odcienie szarości i pokaż go w elemencie <canvas>.
// Wskazówka: Musisz użyć elementu canvas i jego kontekstu (2D) oraz zmodyfikować dane pikseli.

// Zadanie 4: Narysuj przesłany obraz na canvasie
// Wskazówka: Użyj drawImage() w kontekście canvasa, aby narysować obraz. Upewnij się, że rozmiar canvasa odpowiada rozmiarowi obrazu.

// Zadanie 5: Skonwertuj obraz na odcienie szarości poprzez manipulowanie danymi pikseli
// Wskazówka: Użyj getImageData() do pobrania danych pikseli, zastosuj formułę dla odcieni szarości, a następnie użyj putImageData(), aby zaktualizować canvas.

// Zadanie opcjonalne: Zastanów się, co się stanie, jeśli nie zostanie przesłany żaden obraz, a przycisk odcieni szarości zostanie kliknięty.
// Wskazówka: Możesz sprawdzić, czy obraz został przesłany, zanim zastosujesz filtr odcieni szarości.
var iU = document.getElementById("imageUpload")
var cG = document.getElementById("convertGrayscale")
var uI = document.getElementById("uploadedImage")
var gi = document.getElementById("grayscaleImage")
const ctx = gi.getContext("2d")

iU.addEventListener("change", function (e) {
	const file = e.target.files[0]
	if (file) {
		const reader = new FileReader()
		reader.onload = function (e) {
			uI.src = e.target.result
		}
		reader.readAsDataURL(file)
	}
})
cG.addEventListener("click", function (e) {
	ctx.drawImage(uI, 0, 0, gi.width, gi.height)
	const imageData = ctx.getImageData(0, 0, gi.width, gi.height)
	const data = imageData.data

	for (let i = 0; i < data.length; i += 4) {
		const r = data[i]
		const g = data[i + 1]
		const b = data[i + 2]
		const gray = 0.299 * r + 0.587 * g + 0.114 * b
		data[i] = gray
		data[i + 1] = gray
		data[i + 2] = gray
	}
	ctx.putImageData(imageData, 0, 0)
})
