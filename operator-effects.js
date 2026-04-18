// Canvas animations for each operator card.
// Lifted from the original processlang/index.html and kept verbatim in behavior
// because these visuals are part of the language. Re-exposed as a class that
// accepts a runtime color (so it can respond to the active theme).

(function () {
  const isMobile = /Android|iPhone|iPad/i.test(navigator.userAgent);

  class OperatorEffect {
    constructor(canvas, kind, getColor) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.kind = kind;
      this.getColor = getColor; // fn returning 'rgba(r,g,b,1)'
      this.time = Math.random() * 100;
      this.mouseX = 0;
      this.mouseY = 0;
      this.alive = true;

      this.resize();

      if (!isMobile && kind === 'connect') {
        this.canvas.parentElement.addEventListener('mousemove', (e) => {
          const rect = this.canvas.getBoundingClientRect();
          this.mouseX = e.clientX - rect.left;
          this.mouseY = e.clientY - rect.top;
        });
      }

      this.animate();
    }

    resize() {
      const rect = this.canvas.parentElement.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      this.canvas.width = Math.max(1, rect.width * dpr);
      this.canvas.height = Math.max(1, rect.height * dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }

    tint(alpha) {
      // Replace the trailing `1)` with the requested alpha.
      const c = this.getColor();
      return c.replace(/,\s*1\)$/, `,${alpha})`);
    }

    animate() {
      if (!this.alive) return;
      this.time += 0.01;
      this.ctx.clearRect(0, 0, this.width, this.height);

      if (!isMobile) {
        this.ctx.shadowBlur = 8;
        this.ctx.shadowColor = this.tint(1);
      }

      switch (this.kind) {
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

      requestAnimationFrame(() => this.animate());
    }

    drawFlow() {
      this.ctx.strokeStyle = this.tint(0.4);
      this.ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        this.ctx.beginPath();
        for (let x = 0; x < this.width; x += 5) {
          const y = this.height / 2 + Math.sin((x + this.time * 100 + i * 50) * 0.02) * 30;
          this.ctx.lineTo(x, y);
        }
        this.ctx.stroke();
      }
    }

    drawDissolve() {
      this.ctx.fillStyle = this.tint(0.5);
      for (let i = 0; i < 40; i++) {
        const x = (Math.sin(this.time + i) + 1) * this.width / 2;
        const y = (Math.cos(this.time * 0.7 + i) + 1) * this.height / 2;
        const size = Math.abs(Math.sin(this.time + i)) * 8;
        const alpha = Math.abs(Math.sin(this.time + i)) * 0.6;
        this.ctx.globalAlpha = alpha;
        this.ctx.beginPath();
        this.ctx.arc(x, y, size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.globalAlpha = 1;
    }

    drawConnect() {
      const nodes = 6;
      const positions = [];
      for (let i = 0; i < nodes; i++) {
        positions.push({
          x: (Math.sin(this.time + i * 1.2) + 1) * this.width / 2,
          y: (Math.cos(this.time * 0.8 + i * 1.2) + 1) * this.height / 2,
        });
      }
      this.ctx.strokeStyle = this.tint(0.4);
      this.ctx.lineWidth = 1.5;
      positions.forEach((p, i) => {
        for (let j = i + 1; j < positions.length; j++) {
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(positions[j].x, positions[j].y);
          this.ctx.stroke();
        }
        if (!isMobile) {
          const dist = Math.hypot(this.mouseX - p.x, this.mouseY - p.y);
          if (dist < 150) {
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(this.mouseX, this.mouseY);
            this.ctx.strokeStyle = this.tint(0.6 * (1 - dist / 150));
            this.ctx.stroke();
          }
        }
        this.ctx.fillStyle = this.tint(0.6);
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        this.ctx.fill();
      });
    }

    drawObserve() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const radius = 30 + Math.sin(this.time * 2) * 5;
      this.ctx.strokeStyle = this.tint(0.5);
      this.ctx.lineWidth = 2;
      for (let i = 0; i < 3; i++) {
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, radius + i * 15, 0, Math.PI * 2);
        this.ctx.stroke();
      }
    }

    drawChoose() {
      const gridSize = 50;
      const cols = Math.floor(this.width / gridSize) + 1;
      const rows = Math.floor(this.height / gridSize) + 1;
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;
          const wave = Math.sin(this.time * 2 + i * 0.5 + j * 0.5);
          const isActive = wave > 0.6;
          const alpha = isActive ? 0.4 + wave * 0.4 : 0.15;
          this.ctx.strokeStyle = this.tint(alpha);
          this.ctx.lineWidth = isActive ? 2.5 : 1;
          this.ctx.beginPath();
          this.ctx.moveTo(x + gridSize / 2, y);
          this.ctx.lineTo(x, y + gridSize);
          this.ctx.lineTo(x + gridSize, y + gridSize);
          this.ctx.closePath();
          this.ctx.stroke();
          if (isActive && wave > 0.8) {
            this.ctx.fillStyle = this.tint((wave - 0.8) * 0.8);
            this.ctx.fill();
          }
        }
      }
    }

    drawEncode() {
      this.ctx.strokeStyle = this.tint(0.3);
      this.ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < this.width; x += gridSize) {
        for (let y = 0; y < this.height; y += gridSize) {
          const offset = Math.sin(this.time + x * 0.01 + y * 0.01) * 10;
          this.ctx.beginPath();
          this.ctx.rect(x + offset, y + offset, gridSize - 5, gridSize - 5);
          this.ctx.stroke();
        }
      }
    }

    drawCycle() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      this.ctx.strokeStyle = this.tint(0.5);
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      for (let t = 0; t < Math.PI * 4; t += 0.1) {
        const radius = 20 + t * 3;
        const x = centerX + Math.cos(t + this.time) * radius;
        const y = centerY + Math.sin(t + this.time) * radius;
        this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }

    drawLogic() {
      this.ctx.strokeStyle = this.tint(0.4);
      this.ctx.lineWidth = 2;
      const step = this.width / 6;
      for (let i = 1; i < 6; i++) {
        const x = i * step;
        const offset = Math.sin(this.time + i) * 20;
        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x + offset, this.height);
        this.ctx.stroke();
      }
    }

    drawRuntime() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const pulse = Math.abs(Math.sin(this.time)) * 50 + 50;
      this.ctx.fillStyle = this.tint(0.3);
      this.ctx.fillRect(centerX - pulse, centerY - pulse, pulse * 2, pulse * 2);
    }

    drawManifest() {
      const centerX = this.width / 2;
      const centerY = this.height / 2;
      const layers = 5;
      for (let i = 0; i < layers; i++) {
        const progress = (this.time * 0.5 + i * 0.2) % 1;
        const size = 20 + progress * 40;
        const alpha = 0.6 * (1 - progress);
        this.ctx.strokeStyle = this.tint(alpha);
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(centerX, centerY - size);
        this.ctx.lineTo(centerX + size, centerY + size);
        this.ctx.lineTo(centerX - size, centerY + size);
        this.ctx.closePath();
        this.ctx.stroke();
      }
    }
  }

  window.OperatorEffect = OperatorEffect;
})();
