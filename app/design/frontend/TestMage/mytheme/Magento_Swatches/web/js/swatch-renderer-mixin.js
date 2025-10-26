/**
 * Swatch Slider Mixin
 */
define(['jquery', 'swiper'], function ($, Swiper) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {
            
            _RenderSwatchOptions: function (config, controlId) {
                var html = this._super(config, controlId),
                    sliderId = 'swatch-slider-' + controlId;

                // Wrap trong swiper
                var wrappedHtml = '<div class="swatch-slider-container">';
                wrappedHtml += '<div class="swiper ' + sliderId + '">';
                wrappedHtml += '<div class="swiper-wrapper">';

                // Wrap từng swatch-option vào swiper-slide
                var $temp = $('<div>').html(html);
                $temp.find('.swatch-option').wrap('<div class="swiper-slide"></div>');
                wrappedHtml += $temp.html();

                wrappedHtml += '</div>';
                wrappedHtml += '<div class="swiper-button-prev"></div>';
                wrappedHtml += '<div class="swiper-button-next"></div>';
                wrappedHtml += '</div></div>';

                // Init swiper
                setTimeout(function () {
                    new Swiper('.' + sliderId, {
                        slidesPerView: 'auto', // ✅ Cho phép Swiper tự tính số slide hiển thị
                        spaceBetween: 12,
                        freeMode: true,
                        watchOverflow: true, // ✅ Ẩn scroll nếu số lượng slide ít
                        centerInsufficientSlides: true, // ✅ Căn giữa nếu không đủ slide
                        navigation: {
                            nextEl: '.' + sliderId + ' .swiper-button-next',
                            prevEl: '.' + sliderId + ' .swiper-button-prev'
                        },
                        breakpoints: {
                            320: { spaceBetween: 8 },
                            480: { spaceBetween: 10 },
                            768: { spaceBetween: 12 },
                            1024: { spaceBetween: 15 }
                        }
                    });
                }, 100);

                return wrappedHtml;
            }
        });

        return $.mage.SwatchRenderer;
    };
});