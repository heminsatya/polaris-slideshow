"use strict";
/**
 * Dependencies
 */
import { Animations } from "polaris-core/dist/js/modules/Animations";
/**
 * @desc The Slideshow class for handling slideshow componet and its slides
 */
export class Slideshow extends Animations {
    /**
     * @desc Constructor method
     *
     * @param {string|HTMLElement} slideshow -- The required slideshow selector
     * @param {object}             options   -- The optional slideshow options
     */
    constructor(slideshow, options = {}) {
        // Inherit the parent class
        super();
        /**
         * @desc Class properties
         */
        // Name keys
        this.nameSlideshow = 'slideshow';
        this.nameSlideshowItem = 'item';
        this.nameSlideshowMedia = 'media';
        this.nameSlideshowOverlays = 'overlays';
        this.nameSlideshowOverlay = 'overlay';
        this.nameSlideshowCaptions = 'captions';
        this.nameSlideshowCaption = 'caption';
        this.nameSlideshowOption = 'option';
        this.nameSlideshowProgress = 'progress';
        this.nameSlideshowCounter = 'counter';
        this.nameSlideshowPrev = 'prev';
        this.nameSlideshowNext = 'next';
        this.nameSlideshowDots = 'dots';
        this.nameSlideshowFilter = 'filter';
        // Slideshow selectors
        this.slideshow = null;
        this.slideshowItems = null;
        this.slideshowMedias = null;
        this.slideshowProgress = null;
        this.slideshowCounter = null;
        this.slideshowPrev = null;
        this.slideshowNext = null;
        this.slideshowDots = null;
        // Private properties
        this.itemsCount = 0;
        this.activeItem = null;
        this.activeDot = null;
        this.activeIndex = 0;
        this.animationEnter = this.fadeInAnimation;
        this.animationExit = this.fadeOutAnimation;
        this.slideInterval = null;
        this.timerInterval = null;
        this.pauseIntervals = false;
        this.remainingTime = 0;
        this.sliding = false;
        this.firstLoad = true;
        this.mediaLoaded = false;
        // Default options
        this.mediaShrink = true;
        this.isAutoplay = false;
        this.hoverPause = false;
        this.timeout = 6000;
        this.hasProgress = false;
        this.hasCounter = false;
        this.hasControls = true;
        this.hasDots = false;
        this.width = 0;
        this.height = 0;
        this.slideshowSkin = 'auto';
        this.mediaFilter = false;
        this.mediaControls = true;
        this.mediaAutoplay = false;
        this.syncRatio = 0.5;
        // Slideshow options
        this.options = {
            "mediaShrink": this.mediaShrink,
            "isAutoplay": this.isAutoplay,
            "hoverPause": this.hoverPause,
            "timeout": this.timeout,
            "hasProgress": this.hasProgress,
            "hasCounter": this.hasCounter,
            "hasControls": this.hasControls,
            "hasDots": this.hasDots,
            "round": false,
            "width": null,
            "height": null,
            "skin": this.slideshowSkin,
            "mediaControls": this.mediaControls,
            "mediaAutoplay": this.mediaAutoplay,
            "syncRatio": this.syncRatio,
            "mediaFilter": this.mediaFilter,
            "phoneHeight": null,
            "tabletHeight": null,
            "desktopHeight": null,
            "mediaEnter": null,
            "mediaExit": null,
            "mediaEnterPrev": null,
            "mediaExitPrev": null,
            "mediaEnterNext": null,
            "mediaExitNext": null,
            "overlayEnter": null,
            "overlayExit": null,
            "overlayEnterPrev": null,
            "overlayExitPrev": null,
            "overlayEnterNext": null,
            "overlayExitNext": null,
            "captionEnter": null,
            "captionExit": null,
            "captionEnterPrev": null,
            "captionExitPrev": null,
            "captionEnterNext": null,
            "captionExitNext": null,
            "counterPosition": null,
            "dotsPosition": null,
            "captionsPosition": null,
            "overlaysPosition": null,
        };
        // Valid slideshow selector
        if (this.exist(slideshow)['status']) {
            // String slideshow selector
            if (typeof (slideshow) === "string") {
                this.slideshow = document.querySelector(slideshow);
            }
            // HTMLElement slideshow selector
            else if (typeof (slideshow) === "object") {
                this.slideshow = slideshow;
            }
            // Set slideshow items
            this.slideshowItems = this.slideshow.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowItem}`);
            this.itemsCount = this.slideshowItems.length;
            // No slide
            if (this.itemsCount == 0) {
                throw 'No slide found!';
            }
            // Set items media
            this.slideshowMedias = this.slideshow.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowMedia}`);
            // Update options
            if (options)
                this.options = options;
            // Check options
            if (!('mediaShrink' in this.options))
                this.options['mediaShrink'] = this.mediaShrink;
            if (!('isAutoplay' in this.options))
                this.options['isAutoplay'] = this.isAutoplay;
            if (!('hoverPause' in this.options))
                this.options['hoverPause'] = this.hoverPause;
            if (!('timeout' in this.options))
                this.options['timeout'] = this.timeout;
            if (!('hasProgress' in this.options))
                this.options['hasProgress'] = this.hasProgress;
            if (!('hasCounter' in this.options))
                this.options['hasCounter'] = this.hasCounter;
            if (!('hasControls' in this.options))
                this.options['hasControls'] = this.hasControls;
            if (!('hasDots' in this.options))
                this.options['hasDots'] = this.hasDots;
            if (!('mediaControls' in this.options))
                this.options['mediaControls'] = this.mediaControls;
            if (!('mediaAutoplay' in this.options))
                this.options['mediaAutoplay'] = this.mediaAutoplay;
            if (!('syncRatio' in this.options))
                this.options['syncRatio'] = this.syncRatio;
            if (!('skin' in this.options))
                this.options['skin'] = this.slideshowSkin;
            if (!('mediaFilter' in this.options))
                this.options['mediaFilter'] = this.mediaFilter;
            // Final check filter
            if (this.options['mediaFilter']) {
                this.options['skin'] = this.nameLight;
            }
            // Refine ratio
            if (this.options['syncRatio'] < 0) {
                this.options['syncRatio'] = 0;
            }
            else if (this.options['syncRatio'] > 1) {
                this.options['syncRatio'] = 1;
            }
            // Start the slideshow
            this.start();
        }
        // Invalid slideshow selector
        else {
            throw 'The "slideshow" property of the Slideshow class cannot be empty or null!';
        }
    }
    /**
     * @desc Starts the Slideshow
     *
     * @return {void}
     */
    start() {
        // Set items
        this.setItems();
        // Set options
        this.setOptions();
        // Previous Slide
        this.prevSlide();
        // Next Slide
        this.nextSlide();
        // Dots Slide
        this.dotSlide();
        // Slideshow events
        this.slideEvents();
        /**
         *  Set the deault slide
         */
        let interval = setInterval(() => {
            // Fully loaded
            if (this.mediaLoaded) {
                this.setSlide(0);
                // Clear the interval
                clearInterval(interval);
            }
        }, 10);
    }
    /**
     * @desc Sets Slideshow items
     *
     * @var {HTMLElement}   media       -- The items media
     * @var {HTMLElement[]} overlays    -- The items overlays
     * @var {HTMLElement[]} captions    -- The items captions
     *
     * @return {void}
     */
    setItems() {
        // Loop items
        for (let i = 0; i < this.itemsCount; i++) {
            // Set data-index
            this.slideshowItems[i].dataset.index = i;
            // Item media
            if (this.slideshowItems[i].querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowMedia}`)) {
                const media = this.slideshowItems[i].querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowMedia}`);
                // Add animation, animation-animated classList
                this.addClasses(media, [this.nameAnimation, this.nameAnimation + this.modSep + this.nameAnimated]);
                // Set content for the media
                this.setContent(media, 'media');
                // Set the default slide active class
                if (i == 0) {
                    // Set the active class
                    this.activeItem = this.slideshowItems[0];
                    // Add active class to slide
                    this.addClass(this.activeItem, this.nameActive);
                }
                // Set default --animation
                media.style.setProperty('--animation', 'none');
            }
            // Item overlays
            if (this.slideshowItems[i].querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowOverlay}`).length) {
                const overlays = this.slideshowItems[i].querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowOverlay}`);
                // Set item overlays
                overlays.forEach((overlay) => {
                    // Add animation, animation-animated classList
                    this.addClasses(overlay, [this.nameAnimation, this.nameAnimation + this.modSep + this.nameAnimated]);
                    // Set content for overlays
                    this.setContent(overlay);
                    // Set default --animation
                    overlay.style.setProperty('--animation', 'none');
                });
            }
            // Item captions
            if (this.slideshowItems[i].querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCaption}`).length) {
                const captions = this.slideshowItems[i].querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCaption}`);
                // Set item captions
                captions.forEach((caption) => {
                    // Add animation, animation-animated classList
                    this.addClasses(caption, [this.nameAnimation, this.nameAnimation + this.modSep + this.nameAnimated]);
                    // Set default --animation
                    caption.style.setProperty('--animation', 'none');
                });
            }
        }
    }
    /**
     * @desc Extract extension from a file name
     *
     * @param {string} file -- The file name to process
     *
     * @var {string} ext -- The file extension
     * @var {array}  arr -- The file string array
     *
     * @return {string}
     */
    fileExtension(file) {
        let ext = '';
        let arr = [];
        // Set file array
        arr = file.split('.');
        // Set extension
        ext = '.' + arr[arr.length - 1];
        // Return the extracted extension
        return ext;
    }
    /**
     * @desc Sets the slide content
     *
     * @param {HTMLElement} node -- The node to set content for
     *
     * @var {HTMLElement} inner    -- The inner media element
     * @var {string}      maxWidth -- Media images max-width
     * @var {string}      alt      -- The image alternative text
     * @var {string}      ext      -- The media extension
     * @var {string}      type     -- The media MIME type
     * @var {string}      controls -- The video controls
     * @var {string}      muted    -- The muted video
     *
     * @return {void}
     */
    setContent(node, mode = null) {
        let inner, index = 0, maxWidth = '', alt = '', ext = '', type = '', controls = '', muted = '';
        // Check mode
        if (mode == 'media') {
            // Find index
            index = Number(node.parentElement.dataset.index);
            // Find extension
            if (node.dataset.src)
                ext = this.fileExtension(node.dataset.src);
            // Check mediaControls
            if (this.options['mediaControls'])
                controls = ' controls';
        }
        // Media max-width
        if (this.options['mediaShrink'])
            maxWidth = ' style="max-width: inherit;"';
        // Image
        if (node.dataset.type == 'image') {
            // Check type
            if (!['.webp', '.jpg', '.jpeg', '.apng', '.png', '.avif', '.gif', '.svg'].includes(ext)) {
                throw `Unsupported image extension detected! \nSupported image extensions are: ['.webp', '.jpg', '.jpeg', '.apng', '.png', '.avif', '.gif', '.svg']`;
            }
            // Check alternative text
            if (node.dataset.alt)
                alt = ` alt="${node.dataset.alt}"`;
            // Set node content
            node.innerHTML = `<img src="${node.dataset.src}"${alt + maxWidth}>`;
            // Set inner node
            inner = node.querySelector('img');
        }
        // Video
        else if (node.dataset.type == 'video') {
            // Produce file type
            if (ext == '.mp4')
                type = 'video/mp4';
            else if (ext == '.webm')
                type = 'video/webm';
            else
                type = '';
            // Check type
            if (!type) {
                throw `Unsupported video extension detected! \nSupported video extensions are: ['.mp4', '.webm']`;
            }
            // Check autoplay
            if (this.options['mediaAutoplay']) {
                muted = ' muted loop';
            }
            // Set node content
            node.innerHTML = `<video preload="metadata"${controls + muted + maxWidth}><source src="${node.dataset.src}" type="${type}"></video>`;
            // Set inner node
            inner = node.querySelector('video');
        }
        // HTML
        else if (node.dataset.type == 'html') {
            // Set node content
            if (node.dataset.html)
                node.innerHTML = node.dataset.html;
            // Set inner node
            if (node.firstElementChild)
                inner = node.firstElementChild;
            else
                inner = node;
        }
        // Unknown
        else {
            throw 'Unsupported media format detected!';
        }
        // Check heigts
        if (this.options['height'] || this.options['phoneHeight'] || this.options['tabletHeight'] || this.options['desktopHeight']) {
            if (this.options['mediaShrink'])
                inner.style.maxHeight = '100%';
        }
        // Media mode        
        if (mode == 'media') {
            // Fetch inner size after loading
            // Image
            if (node.dataset.type == 'image') {
                inner.onload = () => {
                    // Set the default width
                    if (!this.options['width'] && inner.naturalWidth > this.width)
                        this.width = inner.naturalWidth;
                    if (!this.options['width'] && inner.getBoundingClientRect().width > this.width)
                        this.width = inner.getBoundingClientRect().width;
                    // Set the default height
                    if (!this.options['height'] && inner.clientHeight > this.height)
                        this.height = inner.clientHeight;
                    // if (!this.options['height'] && inner.getBoundingClientRect().height > this.height) this.height = inner.getBoundingClientRect().height;
                    // Fully loaded
                    if (index + 1 == this.itemsCount)
                        this.mediaLoaded = true;
                };
            }
            // Video
            else if (node.dataset.type == 'video') {
                inner.onloadedmetadata = () => {
                    // Set the default width
                    if (!this.options['width'] && inner.clientWidth > this.width)
                        this.width = inner.clientWidth;
                    if (!this.options['width'] && inner.getBoundingClientRect().width > this.width)
                        this.width = inner.getBoundingClientRect().width;
                    // Set the default height
                    if (!this.options['height'] && inner.clientHeight > this.height)
                        this.height = inner.clientHeight;
                    // if (!this.options['height'] && inner.getBoundingClientRect().height > this.height) this.height = inner.getBoundingClientRect().height;
                    // Fully loaded
                    if (index + 1 == this.itemsCount)
                        this.mediaLoaded = true;
                };
            }
            // Others
            else {
                setTimeout(() => {
                    // Fully loaded
                    if (index + 1 == this.itemsCount)
                        this.mediaLoaded = true;
                }, 10);
            }
        }
    }
    /**
     * @desc Sets Slideshow options
     *
     * @var {string}      controlsContent -- Slideshow controls (prev & next) HTML content
     * @var {string}      dotsContent     -- Slideshow dots HTML content
     * @var {HTMLElement} dots            -- Dots parent (container)
     * @var {HTMLElement} captions        -- Captions parent (container)
     * @var {HTMLElement} overlays        -- Overlays parent (container)
     * @var {number}      windowWidth     -- Window available width
     * @var {HTMLElement} inner           -- The inner media element
     * @var {function}    interval        -- Slideshow size interval
     * @var {string[]}    filterCls       -- the filter class list
     *
     * @return {void|boolean}
     */
    setOptions() {
        var _a;
        /**
         *  Single & Multiple slide
         */
        if (this.itemsCount >= 1) {
            // Create progress
            if (!this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowProgress}`)) {
                this.append("div", this.slideshow, "", [this.nameSlideshow + this.chiSep + this.nameSlideshowProgress]);
            }
            // Create counter
            if (!this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCounter}`)) {
                this.append("div", this.slideshow, "", [this.nameSlideshow + this.chiSep + this.nameSlideshowCounter]);
            }
            // Create controls
            if (!this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowPrev}`)) {
                const controlsContent = '&#10094;';
                this.append("div", this.slideshow, controlsContent, [this.nameSlideshow + this.chiSep + this.nameSlideshowPrev]);
            }
            if (!this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowNext}`)) {
                const controlsContent = '&#10095;';
                this.append("div", this.slideshow, controlsContent, [this.nameSlideshow + this.chiSep + this.nameSlideshowNext]);
            }
            // Create dots
            if (!this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots}`)) {
                let dotsContent = '';
                for (let i = 0; i < this.itemsCount; i++) {
                    this.slideshowItems[i].dataset.index = i;
                    dotsContent += `<li data-index="${i}"></li>`;
                }
                this.append("ul", this.slideshow, dotsContent, [this.nameSlideshow + this.chiSep + this.nameSlideshowDots]);
            }
            // Update slide items
            this.slideshowProgress = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowProgress}`);
            this.slideshowCounter = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCounter}`);
            this.slideshowPrev = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowPrev}`);
            this.slideshowNext = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowNext}`);
            this.slideshowDots = this.slideshow.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots} li`);
            // Set the default dot
            if (this.slideshowDots.length) {
                // Set the active class
                this.addClass(this.slideshowDots[0], this.nameActive);
                // Update the active dot
                this.activeDot = this.slideshowDots[0];
            }
            // Check progress
            if (!this.options['hasProgress']) {
                this.slideshowProgress.style.display = 'none';
            }
            // Check counter
            if (!this.options['hasCounter']) {
                this.slideshowCounter.style.display = 'none';
            }
            // Check controls
            if (!this.options['hasControls']) {
                this.slideshowPrev.style.display = 'none';
                this.slideshowNext.style.display = 'none';
            }
            // Check dots
            if (!this.options['hasDots']) {
                this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots}`).style.display = 'none';
            }
        }
        /**
         *  Single slide
         */
        if (this.itemsCount == 1) {
            // Check progress
            if (this.options['hasProgress']) {
                this.slideshowProgress.style.display = 'none';
            }
            // Check counter
            if (this.options['hasCounter']) {
                this.slideshowCounter.style.display = 'none';
            }
            // Check controls
            if (this.options['hasControls']) {
                this.slideshowPrev.style.display = 'none';
                this.slideshowNext.style.display = 'none';
            }
            // Check dots
            if (this.options['hasDots']) {
                this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots}`).style.display = 'none';
            }
        }
        /**
         *  Set slideshow width, height
         */
        let interval = setInterval(() => {
            // Fully loaded
            if (this.mediaLoaded) {
                /**
                 * Slideshow width
                 */
                // Check width property
                if (this.options['width'])
                    this.width = this.options['width'];
                // Set slideshow width
                if (this.options['width'])
                    this.slideshow.style.maxWidth = this.options['width'];
                else
                    this.slideshow.style.maxWidth = this.width + 'px';
                /**
                 * Slideshow height
                 */
                // Check height property
                if (this.options['height'])
                    this.height = this.options['height'];
                else if (this.height > window.innerHeight)
                    this.height = window.innerHeight;
                // Window width
                const windowWidth = window.innerWidth;
                // Desktop
                if (windowWidth >= this.desktopWidth && this.options['desktopHeight']) {
                    this.slideshow.style.height = this.options['desktopHeight'];
                }
                // Tablet
                else if (windowWidth < this.desktopWidth && windowWidth >= this.tabletWidth && this.options['tabletHeight']) {
                    this.slideshow.style.height = this.options['tabletHeight'];
                }
                // Smartphone
                else if (windowWidth < this.tabletWidth && windowWidth >= this.phoneWidth && this.options['phoneHeight']) {
                    this.slideshow.style.height = this.options['phoneHeight'];
                }
                // All devices
                else {
                    if (this.options['height'])
                        this.slideshow.style.height = this.options['height'];
                    else
                        this.slideshow.style.height = this.height + 'px';
                }
                // Clear the interval
                clearInterval(interval);
            }
        }, 10);
        /**
         *  Set slideshow skin
         */
        // Reverse colors
        if (this.options['skin'] == 'reverse') {
            // Check document color
            if ((_a = document.querySelector('body')) === null || _a === void 0 ? void 0 : _a.classList.contains(`${this.nameDoc + this.modSep + this.nameLight}`)) {
                this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameDark);
            }
            else {
                this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameLight);
            }
            // On class change
            this.onClassChange(document.querySelector('body'), (node) => {
                // Check document color
                if (node.classList.contains(`${this.nameDoc + this.modSep + this.nameLight}`)) {
                    this.removeClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameLight);
                    this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameDark);
                }
                else {
                    this.removeClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameDark);
                    this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameLight);
                }
            });
        }
        // Normal colors
        else if (this.options['skin'] != 'auto') {
            this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.options['skin']);
        }
        /**
         *  Set slideshow filter
         */
        if (this.options['mediaFilter']) {
            // Produce the filter class
            const filterCls = this.nameSlideshow + this.chiSep + this.nameSlideshowFilter;
            // Append the filter
            this.append('div', this.slideshow, '', [filterCls]);
        }
        /**
         *  Set slideshow roundness
         */
        if (this.options['round']) {
            this.addClass(this.slideshow, this.nameSlideshow + this.modSep + this.nameRadius);
        }
        /**
         *  Set slideshow positions
         */
        // Conter position
        if (this.options['counterPosition']) {
            // Check element existence
            if (this.slideshowCounter) {
                // Unset default positions
                this.slideshowCounter.style.inset = "unset";
                // Set alternative margin
                if (['top', 'bottom'].includes(this.options['counterPosition'])) {
                    this.slideshowCounter.style.margin = "1rem 0";
                }
                else if (['top-left', 'left', 'bottom-left', 'top-right', 'right', 'bottom-right'].includes(this.options['counterPosition'])) {
                    this.slideshowCounter.style.margin = "1rem";
                }
                // Add position class
                this.addClass(this.slideshowCounter, this.namePosition + this.modSep + this.options['counterPosition']);
            }
        }
        // Dots position
        if (this.options['dotsPosition']) {
            const dots = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots}`);
            // Check element existence
            if (dots) {
                // Unset default positions
                dots.style.inset = "unset";
                // Set alternative margin
                if (['top', 'bottom'].includes(this.options['dotsPosition'])) {
                    dots.style.margin = "1rem 0";
                }
                else if (['top-left', 'left', 'bottom-left', 'top-right', 'right', 'bottom-right'].includes(this.options['dotsPosition'])) {
                    dots.style.margin = "1rem";
                }
                // Add position class
                this.addClass(dots, this.namePosition + this.modSep + this.options['dotsPosition']);
            }
        }
        // Captions position
        if (this.options['captionsPosition']) {
            const captions = this.slideshow.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCaptions}`);
            // Check element existence
            if (captions.length) {
                captions.forEach((caption) => {
                    // Unset default positions
                    caption.style.inset = "unset";
                    // Set alternative margin
                    if (['top', 'bottom'].includes(this.options['captionsPosition'])) {
                        caption.style.margin = "1rem 0";
                    }
                    else if (['top-left', 'left', 'bottom-left', 'top-right', 'right', 'bottom-right'].includes(this.options['captionsPosition'])) {
                        caption.style.margin = "1rem";
                    }
                    // Add position class
                    this.addClass(caption, this.namePosition + this.modSep + this.options['captionsPosition']);
                });
            }
        }
        // Overlays position
        if (this.options['overlaysPosition']) {
            const overlays = this.slideshow.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowOverlays}`);
            // Check element existence
            if (overlays.length) {
                overlays.forEach((overlay) => {
                    // Unset default positions
                    overlay.style.inset = "unset";
                    // Set alternative margin
                    if (['top', 'bottom'].includes(this.options['overlaysPosition'])) {
                        overlay.style.margin = "1rem 0";
                    }
                    else if (['top-left', 'left', 'bottom-left', 'top-right', 'right', 'bottom-right'].includes(this.options['overlaysPosition'])) {
                        overlay.style.margin = "1rem";
                    }
                    // Add position class
                    this.addClass(overlay, this.namePosition + this.modSep + this.options['overlaysPosition']);
                });
            }
        }
    }
    /**
     * @desc Handles prev control click
     *
     * @var {number} index -- Previous slide index
     *
     * @return {void}
     */
    prevSlide() {
        if (this.slideshowPrev) {
            this.slideshowPrev.onclick = () => {
                // Find previous index
                let index = this.activeIndex - 1;
                // Check index
                if (index < 0)
                    index = this.itemsCount - 1;
                // Set slide
                this.setSlide(index, 'previous');
            };
        }
    }
    /**
     * @desc Handles next control click
     *
     * @var {number} index -- Next slide index
     *
     * @return {void}
     */
    nextSlide() {
        if (this.slideshowNext) {
            this.slideshowNext.onclick = () => {
                // Find next index
                let index = this.activeIndex + 1;
                // Check index
                if (index >= this.itemsCount)
                    index = 0;
                // Set slide
                this.setSlide(index, 'next');
            };
        }
    }
    /**
     * @desc Handles dots click
     *
     * @var {number} index -- Clicked slide index
     *
     * @return {void}
     */
    dotSlide() {
        if (this.options['hasDots']) {
            this.slideshowDots.forEach((dot) => {
                dot.onclick = () => {
                    // Find index
                    let index = Number(dot.dataset.index);
                    // Set slide
                    if (index != this.activeIndex)
                        this.setSlide(index);
                };
            });
        }
    }
    /**
     * @desc Handles automatic slide
     *
     * @param {number} timeout -- Slideshow timeout
     *
     * @var   {number} remain  -- Remaining time
     *
     * @return {void}
     */
    autoSlide(timeout = 0) {
        if (this.options['isAutoplay'] && this.itemsCount > 1) {
            let remain;
            // Set remain time
            if (timeout)
                remain = timeout;
            else
                remain = this.options['timeout'];
            // Set slide interval
            this.slideInterval = setInterval(() => {
                // Set next slide
                if (!this.pauseIntervals)
                    this.slideshowNext.click();
            }, remain);
        }
    }
    /**
     * @desc Handles slideshow hover events
     *
     * @return {void}
     */
    hoverEvents() {
        // On hover
        this.slideshow.onmouseover = () => {
            // Pause the interval
            this.pauseIntervals = true;
            // Clear the interval
            if (this.slideInterval)
                clearInterval(this.slideInterval);
        };
        // On leave hover
        this.slideshow.onmouseleave = () => {
            // Resume the interval
            this.pauseIntervals = false;
            // Clear the interval
            if (this.slideInterval)
                clearInterval(this.slideInterval);
            // Rerun the slideshow with the remaining time
            this.autoSlide(this.remainingTime);
            // Rerun the slide timer
            this.slideTimer();
        };
    }
    /**
     * @desc Handles slideshow window events
     *
     * @var {number}      windowWidth -- Window available width
     * @var {HTMLElement} inner       -- The inner media element
     *
     * @return {void}
     */
    windowEvents() {
        // Leave window
        window.onblur = () => {
            // Pause the media
            // Video
            if (this.activeItem.querySelector('video'))
                this.activeItem.querySelector('video').pause();
            // Audio
            if (this.activeItem.querySelector('audio'))
                this.activeItem.querySelector('audio').pause();
            // Pause the interval
            this.pauseIntervals = true;
            // Clear the interval
            if (this.slideInterval)
                clearInterval(this.slideInterval);
        };
        // Show window
        window.onfocus = () => {
            // Reload the media
            if (this.options['mediaAutoplay']) {
                // Video
                if (this.activeItem.querySelector('video')) {
                    this.activeItem.querySelector('video').play();
                }
                // Audio
                if (this.activeItem.querySelector('audio')) {
                    this.activeItem.querySelector('audio').play();
                }
            }
            // Resume the interval
            this.pauseIntervals = false;
            // Clear the interval
            if (this.slideInterval)
                clearInterval(this.slideInterval);
            // Rerun the slideshow with the remaining time
            this.autoSlide(this.remainingTime);
            // Rerun the slide timer
            this.slideTimer();
        };
        // Window resize
        window.onresize = () => {
            // Reset height
            this.height = 0;
            // Check items media
            this.slideshowMedias.forEach((media) => {
                // Inner element
                if (media.firstElementChild) {
                    const inner = media.firstElementChild;
                    // Set height property
                    if (!this.options['height'] && inner.clientHeight > this.height)
                        this.height = inner.clientHeight;
                    if (!this.options['height'] && this.height > window.innerHeight)
                        this.height = window.innerHeight;
                    // if (!this.options['height'] && inner.getBoundingClientRect().height > this.height) this.height = inner.getBoundingClientRect().height;
                }
                // Only text
                else {
                    // Set height property
                    if (!this.options['height'] && media.getBoundingClientRect().height > this.height)
                        this.height = media.getBoundingClientRect().height;
                }
            });
            /**
             * Slideshow height
             */
            // Check height property
            if (this.options['height'])
                this.height = this.options['height'];
            // Window width
            const windowWidth = window.innerWidth;
            // Desktop
            if (windowWidth >= this.desktopWidth && this.options['desktopHeight']) {
                this.slideshow.style.height = this.options['desktopHeight'];
            }
            // Tablet
            else if (windowWidth < this.desktopWidth && windowWidth >= this.tabletWidth && this.options['tabletHeight']) {
                this.slideshow.style.height = this.options['tabletHeight'];
            }
            // Smartphone
            else if (windowWidth < this.tabletWidth && windowWidth >= this.phoneWidth && this.options['phoneHeight']) {
                this.slideshow.style.height = this.options['phoneHeight'];
            }
            // All devices
            else {
                if (this.options['height'])
                    this.slideshow.style.height = this.options['height'];
                else
                    this.slideshow.style.height = this.height + 'px';
            }
        };
    }
    /**
     * @desc Handles slideshow events
     *
     * @return {void}
     */
    slideEvents() {
        if (this.options['isAutoplay']) {
            // Pause on hover
            if (this.options['hoverPause']) {
                // Hover events 
                this.hoverEvents();
            }
            // Window events
            this.windowEvents();
        }
    }
    /**
     * @desc Handles slides timer
     *
     * @var {number} progressWidth -- The slideshow progress width (0-100)
     *
     * @return {void}
     */
    slideTimer() {
        // Clear the interval
        if (this.timerInterval)
            clearInterval(this.timerInterval);
        if (this.options['isAutoplay']) {
            // Check progress option
            if (!this.pauseIntervals) {
                let progressWidth;
                // Default remaining time
                if (this.remainingTime <= 0)
                    this.remainingTime = this.options['timeout'];
                // Set timer interval
                this.timerInterval = setInterval(() => {
                    // Set remaining time
                    this.remainingTime -= 10;
                    // Produce progress width
                    progressWidth = 100 - ((this.remainingTime / this.options['timeout']) * 100);
                    // Set the progress width
                    if (this.options['hasProgress'])
                        this.slideshowProgress.style.width = progressWidth + '%';
                    // Check pause or remaining time
                    if (this.pauseIntervals || this.remainingTime <= 0) {
                        clearInterval(this.timerInterval);
                        if (this.remainingTime <= 0 && this.options['hasProgress'])
                            this.slideshowProgress.style.width = '0%';
                    }
                }, 10);
            }
        }
    }
    /**
     * @desc Sets a slide
     *
     * @param {number} index -- The index number
     * @param {number} mode -- The slide mode (next, previous)
     *
     * @var {HTMLElement}   slide            -- The slideshow item (slide)
     * @var {HTMLElement}   media            -- The item media
     * @var {HTMLElement[]} overlays         -- The item overlays
     * @var {HTMLElement[]} captions         -- The item captions
     * @var {string}        mediaAnimation   -- The media animation
     * @var {string}        overlayAnimation -- A specefic overlay animation
     * @var {string}        captionAnimation -- A specefic caption animation
     * @var {string}        slideMode        -- The slide mode {next, previous}
     *
     * @return {void}
     */
    setSlide(index, mode = null) {
        // Check sliding
        if (!this.sliding) {
            // Clear the timer interval
            if (this.timerInterval)
                clearInterval(this.timerInterval);
            // Stop the slide interval
            if (this.slideInterval)
                clearInterval(this.slideInterval);
            // Reset the progressbar
            if (this.options['hasProgress'])
                this.slideshowProgress.style.width = '0%';
            // Reset the timer
            this.remainingTime = 0;
            // Start sliding
            this.sliding = true;
            // Default vaiables
            let slide, media, overlays, captions;
            let mediaAnimation, overlayAnimation, captionAnimation;
            let slideMode;
            let ratio;
            let itemTimout;
            // Set mode
            if (mode)
                slideMode = mode;
            else if (index >= this.activeIndex)
                slideMode = 'next';
            else
                slideMode = 'previous';
            /**
             * Old (current) Slide
             */
            if (!this.firstLoad) {
                // Fetch old slide items
                slide = this.slideshowItems[this.activeIndex];
                media = slide.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowMedia}`);
                overlays = slide.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowOverlay}`);
                captions = slide.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCaption}`);
                // Fetch the active slide & dot
                this.activeItem = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowItem}.${this.nameActive}`);
                this.activeDot = this.slideshow.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowDots} li.${this.nameActive}`);
                // Remove active class
                this.removeClass(this.activeItem, this.nameActive);
                // Remove active dot class
                if (this.activeDot) {
                    // Remove active class
                    this.removeClass(this.activeDot, this.nameActive);
                }
                // Hide captions
                if (captions.length) {
                    captions.forEach((caption) => {
                        // Find animation
                        if (caption.dataset.exit)
                            captionAnimation = caption.dataset.exit;
                        else if (caption.dataset.exitPrev && slideMode == 'previous')
                            captionAnimation = caption.dataset.exitPrev;
                        else if (caption.dataset.exitNext && slideMode == 'next')
                            captionAnimation = caption.dataset.exitNext;
                        else if (this.options['captionExit'])
                            captionAnimation = this.options['captionExit'];
                        else if (this.options['captionExitPrev'] && slideMode == 'previous')
                            captionAnimation = this.options['captionExitPrev'];
                        else if (this.options['captionExitNext'] && slideMode == 'next')
                            captionAnimation = this.options['captionExitNext'];
                        else
                            captionAnimation = this.animationExit;
                        // Set animation
                        this.animation(caption, captionAnimation);
                    });
                }
                // Hide overlays
                if (overlays.length) {
                    overlays.forEach((overlay) => {
                        // Find animation
                        if (overlay.dataset.exit)
                            overlayAnimation = overlay.dataset.exit;
                        else if (overlay.dataset.exitPrev && slideMode == 'previous')
                            overlayAnimation = overlay.dataset.exitPrev;
                        else if (overlay.dataset.exitNext && slideMode == 'next')
                            overlayAnimation = overlay.dataset.exitNext;
                        else if (this.options['overlayExit'])
                            overlayAnimation = this.options['overlayExit'];
                        else if (this.options['overlayExitPrev'] && slideMode == 'previous')
                            overlayAnimation = this.options['overlayExitPrev'];
                        else if (this.options['overlayExitNext'] && slideMode == 'next')
                            overlayAnimation = this.options['overlayExitNext'];
                        else
                            overlayAnimation = this.animationExit;
                        // Set animation
                        this.animation(overlay, overlayAnimation);
                    });
                }
                // Hide media
                if (media) {
                    // Pause the media
                    // Video
                    if (media.querySelector('video'))
                        media.querySelector('video').pause();
                    // Audio
                    if (media.querySelector('audio'))
                        media.querySelector('audio').pause();
                    // Find animation
                    if (media.dataset.exit)
                        mediaAnimation = media.dataset.exit;
                    else if (media.dataset.exitPrev && slideMode == 'previous')
                        mediaAnimation = media.dataset.exitPrev;
                    else if (media.dataset.exitNext && slideMode == 'next')
                        mediaAnimation = media.dataset.exitNext;
                    else if (this.options['mediaExit'])
                        mediaAnimation = this.options['mediaExit'];
                    else if (this.options['mediaExitPrev'] && slideMode == 'previous')
                        mediaAnimation = this.options['mediaExitPrev'];
                    else if (this.options['mediaExitNext'] && slideMode == 'next')
                        mediaAnimation = this.options['mediaExitNext'];
                    else
                        mediaAnimation = this.animationExit;
                    // Set animation
                    this.animation(media, mediaAnimation);
                }
            }
            /**
             * New Slide
             */
            // Update the first load
            if (this.firstLoad)
                this.firstLoad = false;
            // Find new slide items
            slide = this.slideshowItems[index];
            media = slide.querySelector(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowMedia}`);
            overlays = slide.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowOverlay}`);
            captions = slide.querySelectorAll(`.${this.nameSlideshow + this.chiSep + this.nameSlideshowCaption}`);
            // Update the active item
            this.activeItem = slide;
            // Add active class to slide
            this.addClass(slide, this.nameActive);
            // Add active class to relative dot
            this.slideshowDots.forEach((dot) => {
                if (Number(dot.dataset.index) == index) {
                    this.addClass(dot, this.nameActive);
                    // Update the active dot
                    this.activeDot = dot;
                }
            });
            // Show media
            if (media) {
                // Reload the media
                if (this.options['mediaAutoplay']) {
                    // Video
                    if (media.querySelector('video')) {
                        media.querySelector('video').load();
                        media.querySelector('video').play();
                    }
                    // Audio
                    if (media.querySelector('audio')) {
                        media.querySelector('audio').load();
                        media.querySelector('audio').play();
                    }
                }
                // Find animation
                if (media.dataset.enter)
                    mediaAnimation = media.dataset.enter;
                else if (media.dataset.enterPrev && slideMode == 'previous')
                    mediaAnimation = media.dataset.enterPrev;
                else if (media.dataset.enterNext && slideMode == 'next')
                    mediaAnimation = media.dataset.enterNext;
                else if (this.options['mediaEnter'])
                    mediaAnimation = this.options['mediaEnter'];
                else if (this.options['mediaEnterPrev'] && slideMode == 'previous')
                    mediaAnimation = this.options['mediaEnterPrev'];
                else if (this.options['mediaEnterNext'] && slideMode == 'next')
                    mediaAnimation = this.options['mediaEnterNext'];
                else
                    mediaAnimation = this.animationEnter;
                // Set animation
                this.animation(media, mediaAnimation).then(() => {
                    // Clear the timer interval
                    if (this.timerInterval)
                        clearInterval(this.timerInterval);
                    // Stop the intervals
                    if (this.slideInterval)
                        clearInterval(this.slideInterval);
                    // Run Autoplay
                    this.autoSlide();
                    // Run timer
                    this.slideTimer();
                    // Stop sliding
                    this.sliding = false;
                });
            }
            // Synchronicity ratio
            if (media.dataset.duration) {
                // Miliseconds
                if (media.dataset.duration.search("ms")) {
                    ratio = parseInt(media.dataset.duration);
                }
                // Seconds
                else {
                    ratio = parseInt(media.dataset.duration) * 1000;
                }
            }
            else {
                ratio = 1000;
            }
            // Refine ratio
            ratio *= this.options['syncRatio'];
            // Show slide items
            clearTimeout(itemTimout);
            itemTimout = setTimeout(() => {
                // Show overlays
                if (overlays.length) {
                    overlays.forEach((overlay) => {
                        // Find animation
                        if (overlay.dataset.enter)
                            overlayAnimation = overlay.dataset.enter;
                        else if (overlay.dataset.enterPrev && slideMode == 'previous')
                            overlayAnimation = overlay.dataset.enterPrev;
                        else if (overlay.dataset.enterNext && slideMode == 'next')
                            overlayAnimation = overlay.dataset.enterNext;
                        else if (this.options['overlayEnter'])
                            overlayAnimation = this.options['overlayEnter'];
                        else if (this.options['overlayEnterPrev'] && slideMode == 'previous')
                            overlayAnimation = this.options['overlayEnterPrev'];
                        else if (this.options['overlayEnterNext'] && slideMode == 'next')
                            overlayAnimation = this.options['overlayEnterNext'];
                        else
                            overlayAnimation = this.animationEnter;
                        // Set animation
                        this.animation(overlay, overlayAnimation);
                    });
                }
                // Show captions
                if (captions.length) {
                    captions.forEach((caption) => {
                        // Find animation
                        if (caption.dataset.enter)
                            captionAnimation = caption.dataset.enter;
                        else if (caption.dataset.enterPrev && slideMode == 'previous')
                            captionAnimation = caption.dataset.enterPrev;
                        else if (caption.dataset.enterNext && slideMode == 'next')
                            captionAnimation = caption.dataset.enterNext;
                        else if (this.options['captionEnter'])
                            captionAnimation = this.options['captionEnter'];
                        else if (this.options['captionEnterPrev'] && slideMode == 'previous')
                            captionAnimation = this.options['captionEnterPrev'];
                        else if (this.options['captionEnterNext'] && slideMode == 'next')
                            captionAnimation = this.options['captionEnterNext'];
                        else
                            captionAnimation = this.animationEnter;
                        // Set animation
                        this.animation(caption, captionAnimation);
                    });
                }
            }, ratio);
            // Set counter
            if (this.options['hasCounter'])
                this.slideshowCounter.innerHTML = `${Number(slide.dataset.index) + 1}/${this.itemsCount}`;
            // Update active index
            this.activeIndex = index;
        }
    }
}
//# sourceMappingURL=Slideshow.js.map