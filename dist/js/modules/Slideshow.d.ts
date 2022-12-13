/**
 * Dependencies
 */
import { Animations } from "polaris-core/dist/js/modules/Animations";
/**
 * @desc The Slideshow class for handling slideshow componet and its slides
 */
export declare class Slideshow extends Animations {
    /**
     * @desc Class properties
     */
    nameSlideshow: string;
    nameSlideshowItem: string;
    nameSlideshowMedia: string;
    nameSlideshowOverlays: string;
    nameSlideshowOverlay: string;
    nameSlideshowCaptions: string;
    nameSlideshowCaption: string;
    nameSlideshowOption: string;
    nameSlideshowProgress: string;
    nameSlideshowCounter: string;
    nameSlideshowPrev: string;
    nameSlideshowNext: string;
    nameSlideshowDots: string;
    nameSlideshowFilter: string;
    private slideshow;
    private slideshowItems;
    private slideshowMedias;
    private slideshowProgress;
    private slideshowCounter;
    private slideshowPrev;
    private slideshowNext;
    private slideshowDots;
    private itemsCount;
    private activeItem;
    private activeDot;
    private activeIndex;
    private animationEnter;
    private animationExit;
    private slideInterval;
    private timerInterval;
    private pauseIntervals;
    private remainingTime;
    private sliding;
    private firstLoad;
    private mediaLoaded;
    private mediaShrink;
    private isAutoplay;
    private hoverPause;
    private timeout;
    private hasProgress;
    private hasCounter;
    private hasControls;
    private hasDots;
    private width;
    private height;
    private slideshowColor;
    private mediaFilter;
    private mediaControls;
    private mediaAutoplay;
    private options;
    /**
     * @desc Constructor method
     *
     * @param {string|HTMLElement} slideshow -- The required slideshow selector
     * @param {object}             options   -- The optional slideshow options
     */
    constructor(slideshow: string | HTMLElement, options?: object);
    /**
     * @desc Starts the Slideshow
     *
     * @return {void}
     */
    private start;
    /**
     * @desc Sets Slideshow items
     *
     * @var {HTMLElement}   media       -- The items media
     * @var {HTMLElement[]} overlays    -- The items overlays
     * @var {HTMLElement[]} captions    -- The items captions
     *
     * @return {void}
     */
    private setItems;
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
    private fileExtension;
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
    private setContent;
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
    private setOptions;
    /**
     * @desc Handles prev control click
     *
     * @var {number} index -- Previous slide index
     *
     * @return {void}
     */
    private prevSlide;
    /**
     * @desc Handles next control click
     *
     * @var {number} index -- Next slide index
     *
     * @return {void}
     */
    private nextSlide;
    /**
     * @desc Handles dots click
     *
     * @var {number} index -- Clicked slide index
     *
     * @return {void}
     */
    private dotSlide;
    /**
     * @desc Handles automatic slide
     *
     * @param {number} timeout -- Slideshow timeout
     *
     * @var   {number} remain  -- Remaining time
     *
     * @return {void}
     */
    private autoSlide;
    /**
     * @desc Handles slideshow hover events
     *
     * @return {void}
     */
    private hoverEvents;
    /**
     * @desc Handles slideshow window events
     *
     * @var {number}      windowWidth -- Window available width
     * @var {HTMLElement} inner       -- The inner media element
     *
     * @return {void}
     */
    private windowEvents;
    /**
     * @desc Handles slideshow events
     *
     * @return {void}
     */
    private slideEvents;
    /**
     * @desc Handles slides timer
     *
     * @var {number} progressWidth -- The slideshow progress width (0-100)
     *
     * @return {void}
     */
    private slideTimer;
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
    private setSlide;
}
