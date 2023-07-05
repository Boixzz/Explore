(function($) {
    // Each time this function is called, the function is only responsible for a single loop
    // That is to say, it will only generate a single broadcast map, and the scope of this function can only be assigned to one broadcast map
    // When calling this function, you must pass the current tag

    var slide = function(ele,options) {
        var $ele = $(ele);
        // Default setting options
        var setting = {
        		// Control the animation time of the rotation
            speed: 1000,
                // control interval time            
                interval: 10000,
            
        };
        // Object merge
        $.extend(true, setting, options);
        // The position and state of the picture
        var states = [
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 134, $opacity: 0.2 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 0, $opacity: 0.4 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 110, $opacity: 0.7 },
            { $zIndex: 4, width: 224, height: 288, top: 0, left: 263, $opacity: 1 },
            { $zIndex: 3, width: 170, height: 218, top: 35, left: 470, $opacity: 0.7 },
            { $zIndex: 2, width: 130, height: 170, top: 59, left: 620, $opacity: 0.4 },
            { $zIndex: 1, width: 120, height: 150, top: 69, left: 500, $opacity: 0.2 }
        ];

        var $lis = $ele.find('li');
        var timer = null;

        // event
        $ele.find('.hi-next').on('click', function() {
            next();
        });
        $ele.find('.hi-prev').on('click', function() {
            states.push(states.shift());
            move();
        });
        $ele.on('mouseenter', function() {
            clearInterval(timer);
            timer = null;
        }).on('mouseleave', function() {
            autoPlay();
        });

        move();
        autoPlay();

        // Let each li correspond to each state of the above states
        // Let li unfold from the middle
        function move() {
            $lis.each(function(index, element) {
                var state = states[index];
                $(element).css('zIndex', state.$zIndex).finish().animate(state, setting.speed).find('img').css('opacity', state.$opacity);
            });
        }

        // Switch to the next one
        function next() {
            // Principle: The last element of the array moves to the first
            states.unshift(states.pop());
            move();
        }

        function autoPlay() {
            timer = setInterval(next, setting.interval);
        }
    }
    // Find the root tag of, call it slide()
    $.fn.hiSlide = function(options) {
        $(this).each(function(index, ele) {
            slide(ele,options);
        });
        // The return value, so as to support chain type call
        return this;
    }
})(jQuery);
