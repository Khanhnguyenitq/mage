define(['jquery', 'swiper'], function ($, Swiper) {
    'use strict';

    return function (widget) {
        $.widget('mage.SwatchRenderer', widget, {

            _RenderSwatchOptions: function (config, controlId) {
                var html = this._super(config, controlId),
                    optionConfig = this.options.jsonSwatchConfig[config.id],
                    hasImageSwatches = false,
                    sliderId = 'swatch-slider-' + controlId;

                if (optionConfig) {
                    $.each(optionConfig, function (key, value) {
                        if (parseInt(value.type, 10) === 2) {
                            hasImageSwatches = true;
                            return false;
                        }
                    });
                }
                if (!hasImageSwatches) {
                    return html;
                }

                var wrappedHtml = '<div class="swatch-slider-container">';
                wrappedHtml += '<div class="swiper ' + sliderId + '">';
                wrappedHtml += '<div class="swiper-wrapper">';

                var $temp = $('<div>').html(html);
                $temp.find('.swatch-option').wrap('<div class="swiper-slide"></div>');
                wrappedHtml += $temp.html();

                wrappedHtml += '</div>';
                wrappedHtml += '</div></div>';

                setTimeout(function () {
                    new Swiper('.' + sliderId, {
                        slidesPerView: 'auto',
                        spaceBetween: 12,
                        freeMode: true,
                        watchOverflow: true,
                        centerInsufficientSlides: true,
                    });
                }, 100);

                return wrappedHtml;
            },
            _RenderSwatchSelect: function (config, chooseText) {
                var html = this._super(config, chooseText);

                if (!this.options.jsonSwatchConfig.hasOwnProperty(config.id)) {
                    return html;
                }

                return html;
            },
            _EventListener: function () {
                var $widget = this;
                this._super();
                this._AddRadioIcons();
            },

            _AddRadioIcons: function () {
                var $widget = this;

                this.element.find('.swatch-attribute').each(function () {
                    var $attribute = $(this),
                        attributeId = $attribute.attr('data-attribute-id'),
                        isSwatchConfig = $widget.options.jsonSwatchConfig.hasOwnProperty(attributeId);

                    if (!isSwatchConfig || $attribute.find('.swatch-option.image').length === 0) {
                        $attribute.find('.swatch-option.text, .swatch-option.color').each(function () {
                            var $option = $(this);

                            if ($option.find('.radio-icon').length === 0) {
                                $option.prepend('<span class="radio-icon"></span>');
                                $option.addClass('with-radio-icon');
                            }
                        });
                    }
                });
            },

            _OnClick: function ($this, $widget) {
                var $parent = $this.closest('.swatch-attribute'),
                    attributeId = $parent.data('attribute-id'),
                    $input = $parent.find('.super-attribute-select');

                if ($this.hasClass('selected')) {
                    $this.removeClass('selected');
                    $parent.removeAttr('data-option-selected');

                    $input.val('').trigger('change');

                    return;
                }

                this._super($this, $widget);

                if ($this.hasClass('with-radio-icon')) {
                    $this.siblings('.with-radio-icon').removeClass('selected');
                    $this.addClass('selected');
                }
            },


            _Rebuild: function () {
                this._super();
                this._AddRadioIcons();
            }
        });

        return $.mage.SwatchRenderer;
    };
});