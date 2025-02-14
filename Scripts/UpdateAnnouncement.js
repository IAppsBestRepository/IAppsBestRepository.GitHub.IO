document.querySelector('.download-canvas-btn').addEventListener('click', () => {
    const canvas = document.getElementById('myCanvas');
    const link = document.createElement('a');
    link.download = `repository-banner-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
});

let selectedNum = 3;
const inputsContainer = document.getElementById('inputsContainer');
const numButtons = document.querySelectorAll('.num-selector button');

const generateInputs = num => {
    inputsContainer.innerHTML = '';
    Array.from({length: num}).forEach((_, i) => {
        const div = document.createElement('div');
        div.className = 'input-group';
        div.innerHTML = `
          <label>Изображение ${i + 1}:</label>
          <input type="text" id="img${i}" placeholder="Ссылка на изображение">
        `;
        inputsContainer.appendChild(div);
    });
};

generateInputs(selectedNum);

numButtons.forEach(button => {
    button.addEventListener('click', function() {
        numButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        selectedNum = parseInt(this.dataset.num);
        generateInputs(selectedNum);
    });
});

document.querySelector('.num-selector button[data-num="3"]').classList.add('active');

let animationFrameId = null;

document.getElementById('displayBtn').addEventListener('click', () => {
    const urls = Array.from({length: selectedNum})
      .map((_, i) => document.getElementById(`img${i}`).value.trim());

    if (urls.some(url => !url)) {
        alert("Пожалуйста, заполните все ссылки на изображения");
        return;
    }

    const canvasContainer = document.getElementById('canvasContainer');
    canvasContainer.style.display = 'inline-block';
  
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const [canvasWidth, canvasHeight] = [1000, 400];
    const dpr = window.devicePixelRatio || 1;

    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const images = [];
    let loadedCount = 0;

    urls.forEach((url, index) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
            loadedCount++;
            if (loadedCount === selectedNum) drawCanvas();
        };
        img.onerror = () => alert(`Ошибка загрузки изображения ${index + 1}`);
        img.src = url;
        images.push(img);
    });

    const drawCanvas = () => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);

    const targetHeights = {
        3: [70, 90, 70],
        5: [60, 80, 100, 80, 60],
        7: [50, 65, 80, 100, 80, 65, 50]
    }[selectedNum];

    const bottomLine = 300;
    const yPositions = targetHeights.map(h => bottomLine - h);
    const widths = images.map((img, i) => img.width * (targetHeights[i] / img.height));
    const overlap = 20;
    const groupWidth = widths.reduce((a, b) => a + b, 0) - (selectedNum - 1) * overlap;
    const startX = (canvasWidth - groupWidth) / 2;
    const xs = [startX];

    for (let i = 1; i < selectedNum; i++) {
        xs[i] = xs[i-1] + widths[i-1] - overlap;
    }

    const drawOrder = {
        3: [0, 2, 1],
        5: [0, 4, 1, 3, 2],
        7: [0, 6, 1, 5, 2, 4, 3]
    }[selectedNum];

    const drawRoundedImage = (image, x, y, width, height, radius) => {
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(image, x, y, width, height);
        ctx.restore();
    };

    const animateGradient = time => {
        const gradientOffset = (time * 0.05) % 800;
        const gradient = ctx.createLinearGradient(
            gradientOffset - 400, 0,
            gradientOffset + 400, 0
        );
        gradient.addColorStop(0, '#8A2BE2');
        gradient.addColorStop(0.25, '#4B0082');
        gradient.addColorStop(0.5, '#0000FF');
        gradient.addColorStop(0.75, '#00BFFF');
        gradient.addColorStop(1, '#8A2BE2');
        return gradient;
    };

    const drawFrame = time => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        ctx.fillStyle = "#0D1117";
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  
        const text = "Update Repository";
        ctx.font = "bold 32px sans-serif";
        const textWidth = ctx.measureText(text).width;
        ctx.fillStyle = animateGradient(time);
        ctx.fillText(text, (canvasWidth - textWidth) / 2, 160);
  
        drawOrder.forEach(i => {
            drawRoundedImage(images[i], xs[i], yPositions[i], widths[i], targetHeights[i], 20);
        });
  
        animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame(0);
  };
});
