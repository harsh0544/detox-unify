// CountTo: Animate numbers from a start to an end value
class CountTo {
  constructor(element, options = {}) {
    this.element = element;
    this.from = Number(element.dataset.from) || 0;
    this.to = Number(element.dataset.to) || 0;
    this.speed = Number(element.dataset.speed) || 1000;
    this.refreshInterval = Number(element.dataset.refreshInterval) || 100;
    this.decimals = Number(element.dataset.decimals) || 0;
    this.formatter = options.formatter || this.defaultFormatter;
    this.onUpdate = options.onUpdate;
    this.onComplete = options.onComplete;
    this.frame = 0;
    this.loops = Math.ceil(this.speed / this.refreshInterval);
    this.increment = (this.to - this.from) / this.loops;
    this.value = this.from;
    this.interval = null;
  }

  defaultFormatter(value) {
    return value.toFixed(this.decimals);
  }

  start() {
    this.render(this.value);
    this.interval = setInterval(() => {
      this.value += this.increment;
      this.frame++;
      this.render(this.value);
      if (typeof this.onUpdate === 'function') {
        this.onUpdate.call(this.element, this.value);
      }
      if (this.frame >= this.loops) {
        clearInterval(this.interval);
        this.value = this.to;
        this.render(this.value);
        if (typeof this.onComplete === 'function') {
          this.onComplete.call(this.element, this.value);
        }
      }
    }, this.refreshInterval);
  }

  render(value) {
    this.element.textContent = this.formatter.call(this, value, this);
  }
}

// Usage for elements with class "timer"
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.timer').forEach(el => {
    const options = {
      formatter: function(value, instance) {
        return value
          .toFixed(instance.decimals)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    };
    new CountTo(el, options).start();
  });
});