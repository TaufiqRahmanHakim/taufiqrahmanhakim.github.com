document.addEventListener('DOMContentLoaded', function() { 
    const textToType = "Building scalable applications with C#, Vue.js, and Cloud Technologies...";
        const typeWriterElement = document.getElementById('typewriter');
        let typeIndex = 0;

        function typeWriter() {
            if (typeIndex < textToType.length) {
                typeWriterElement.innerHTML += textToType.charAt(typeIndex);
                typeIndex++;
                setTimeout(typeWriter, 50);
            }
        }
        
        window.addEventListener('load', () => {
            setTimeout(typeWriter, 1000);
        });


        // --- GENERIC SLIDER CLASS ---
        class Slider {
            constructor(trackId, prevBtnId, nextBtnId) {
                this.track = document.getElementById(trackId);
                this.prevBtn = document.getElementById(prevBtnId);
                this.nextBtn = document.getElementById(nextBtnId);
                this.currentIndex = 0;

                // Bind events
                this.init();
            }

            getItemsPerSlide() {
                if (window.innerWidth <= 768) return 1;
                if (window.innerWidth <= 992) return 2;
                return 3;
            }

            updateButtons(maxIndex) {
                if (!this.prevBtn || !this.nextBtn) return;
                
                this.prevBtn.disabled = (this.currentIndex === 0);
                this.nextBtn.disabled = (this.currentIndex === maxIndex);
                
                this.prevBtn.style.opacity = (this.currentIndex === 0) ? '0.5' : '1';
                this.nextBtn.style.opacity = (this.currentIndex === maxIndex) ? '0.5' : '1';
            }

            moveSlide(direction) {
                const items = this.track.children;
                const totalItems = items.length;
                const itemsPerSlide = this.getItemsPerSlide();
                const maxIndex = Math.max(0, totalItems - itemsPerSlide);

                this.currentIndex += direction;

                if (this.currentIndex < 0) this.currentIndex = 0;
                if (this.currentIndex > maxIndex) this.currentIndex = maxIndex;

                const translateValue = -(this.currentIndex * (100 / itemsPerSlide));
                this.track.style.transform = `translateX(${translateValue}%)`;

                this.updateButtons(maxIndex);
            }

            init() {
                if (!this.track) return;

                // Click Listeners
                if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.moveSlide(-1));
                if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.moveSlide(1));

                // Initial State
                this.resetState();

                // Window Resize Listener
                window.addEventListener('resize', () => {
                    this.resetState();
                });
            }

            resetState() {
                this.currentIndex = 0;
                this.track.style.transform = `translateX(0)`;
                const items = this.track.children;
                const itemsPerSlide = this.getItemsPerSlide();
                const maxIndex = Math.max(0, items.length - itemsPerSlide);
                this.updateButtons(maxIndex);
            }
        }

        // Initialize Sliders when DOM is ready
        window.addEventListener('DOMContentLoaded', () => {
            // Project Slider
            new Slider('projectTrack', 'projPrevBtn', 'projNextBtn');
            
            // Certificate Slider
            new Slider('certTrack', 'certPrevBtn', 'certNextBtn');
        });

})