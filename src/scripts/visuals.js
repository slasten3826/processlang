// src/scripts/visuals.js

const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

class CommandEffect {
    constructor(canvas, type, color) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.type = type;
        this.color = color;
        this.time = 0;
        this.width = 0;
        this.height = 0;
        this.animationId = null;

        this.resize();
        this.animate();
    }

    resize() {
        // Проверяем, жив ли еще canvas в DOM
        if (!this.canvas.parentElement) return;

        const rect = this.canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.width = rect.width;
        this.height = rect.height;
    }

    animate() {
        // ГЛАВНОЕ ИСПРАВЛЕНИЕ:
        // Если canvas исчез со страницы (мы ушли с главной), останавливаем анимацию
        if (!document.body.contains(this.canvas)) {
            cancelAnimationFrame(this.animationId);
            return;
        }

        this.time += 0.01;
        this.ctx.clearRect(0, 0, this.width, this.height);

        if (!isMobile) {
            this.ctx.shadowBlur = 8;
            this.ctx.shadowColor = this.color;
        }

        // Рисуем эффект в зависимости от типа
        switch(this.type) {
            case 'flow': this.drawFlow(); break;
            case 'dissolve': this.drawDissolve(); break;
            case 'connect': this.drawConnect(); break;
            case 'observe': this.drawObserve(); break;
            case 'choose': this.drawChoose(); break;
            case 'encode': this.drawEncode(); break;
            case 'cycle': this.drawCycle(); break;
            case 'logic': this.drawLogic(); break;
            case 'runtime': this.drawRuntime(); break;
            case 'manifest': this.drawManifest(); break;
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    // --- МЕТОДЫ ОТРИСОВКИ (Твой оригинальный код) ---
    drawFlow() {
        this.ctx.strokeStyle = this.color.replace('1)', '0.4)');
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            for (let x = 0; x < this.width; x += 5) {
                const y = this.height/2 + Math.sin((x + this.time * 100 + i * 50) * 0.02) * 30;
                this.ctx.lineTo(x, y);
            }
            this.ctx.stroke();
        }
    }

    drawDissolve() {
        this.ctx.fillStyle = this.color.replace('1)', '0.5)');
        for (let i = 0; i < 20; i++) { // Уменьшил кол-во частиц для оптимизации
            const x = (Math.sin(this.time + i) + 1) * this.width/2;
            const y = (Math.cos(this.time * 0.7 + i) + 1) * this.height/2;
            const size = Math.abs(Math.sin(this.time + i)) * 6;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    drawConnect() {
        this.ctx.strokeStyle = this.color.replace('1)', '0.4)');
        this.ctx.lineWidth = 1.5;
        const nodes = [];
        for(let i=0; i<5; i++) {
            nodes.push({
                x: (Math.sin(this.time + i) + 1) * this.width/2,
                       y: (Math.cos(this.time * 0.8 + i) + 1) * this.height/2
            });
        }
        nodes.forEach((p, i) => {
            for (let j = i + 1; j < nodes.length; j++) {
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(nodes[j].x, nodes[j].y);
                this.ctx.stroke();
            }
        });
    }

    drawObserve() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = 30 + Math.sin(this.time * 2) * 5;
        this.ctx.strokeStyle = this.color.replace('1)', '0.5)');
        this.ctx.lineWidth = 2;
        for (let i = 0; i < 3; i++) {
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius + i * 15, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    drawChoose() {
        // Упрощенная версия для производительности
        const gridSize = 40;
        this.ctx.strokeStyle = this.color.replace('1)', '0.2)');
        for (let x = 0; x < this.width; x += gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        // Активный выбор
        const activeX = (Math.sin(this.time) + 1) * this.width/2;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(activeX, 0);
        this.ctx.lineTo(activeX, this.height);
        this.ctx.stroke();
    }

    drawEncode() {
        this.ctx.strokeStyle = this.color.replace('1)', '0.3)');
        const gridSize = 30;
        for (let x = 0; x < this.width; x += gridSize) {
            for (let y = 0; y < this.height; y += gridSize) {
                const offset = Math.sin(this.time + x*0.01 + y*0.01) * 5;
                this.ctx.strokeRect(x + offset, y + offset, gridSize-10, gridSize-10);
            }
        }
    }

    drawCycle() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        this.ctx.strokeStyle = this.color.replace('1)', '0.5)');
        this.ctx.beginPath();
        for (let t = 0; t < Math.PI * 6; t += 0.1) {
            const r = 10 + t * 5;
            const x = centerX + Math.cos(t + this.time*2) * r;
            const y = centerY + Math.sin(t + this.time*2) * r;
            this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
    }

    drawLogic() {
        this.ctx.strokeStyle = this.color.replace('1)', '0.4)');
        const step = this.width / 5;
        for (let i = 1; i < 5; i++) {
            const x = i * step;
            const off = Math.sin(this.time + i) * 20;
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x + off, this.height);
            this.ctx.stroke();
        }
    }

    drawRuntime() {
        const cx = this.width / 2;
        const cy = this.height / 2;
        const pulse = Math.abs(Math.sin(this.time)) * 40 + 40;
        this.ctx.fillStyle = this.color.replace('1)', '0.2)');
        this.ctx.fillRect(cx - pulse, cy - pulse, pulse * 2, pulse * 2);
    }

    drawManifest() {
        const cx = this.width / 2;
        const cy = this.height / 2;
        for (let i = 0; i < 3; i++) {
            const p = (this.time * 0.5 + i * 0.3) % 1;
            const size = 20 + p * 50;
            const alpha = 0.6 * (1 - p);
            this.ctx.strokeStyle = this.color.replace('1)', `${alpha})`);
            this.ctx.strokeRect(cx - size, cy - size, size * 2, size * 2);
        }
    }
}

// Экспортируемая функция инициализации
function initHomeVisuals() {
    const colorMap = {
        'flow': 'rgba(0, 212, 255, 1)',
        'connect': 'rgba(6, 255, 165, 1)',
        'dissolve': 'rgba(199, 125, 255, 1)',
        'observe': 'rgba(224, 242, 254, 1)',
        'choose': 'rgba(255, 107, 53, 1)',
        'encode': 'rgba(255, 217, 61, 1)',
        'cycle': 'rgba(157, 78, 221, 1)',
        'logic': 'rgba(125, 211, 252, 1)',
        'runtime': 'rgba(96, 165, 250, 1)',
        'manifest': 'rgba(251, 146, 60, 1)'
    };

    const cards = document.querySelectorAll('.command-card');
    cards.forEach(card => {
        const canvas = card.querySelector('.command-canvas');
        const type = card.dataset.command;
        if (canvas && type) {
            new CommandEffect(canvas, type, colorMap[type]);
        }
    });
}
