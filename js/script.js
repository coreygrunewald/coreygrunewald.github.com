$(function() {

  $('div.projects').click(function(){
    window.location = this.getAttribute("data-pathway");
  });

  switch($('body').attr('id'))
  {
    case "root":
      iso('.projects');
      break;
    case "writing":
      iso('.article');
      break;
  }

  function iso(selector) {
    $(window).load(function() {
      $(selector).fadeIn(100);
      var $container = $('#main');
      $container.imagesLoaded( function(){
        $container.isotope({
          animationEngine: 'best-available',
          itemSelector: selector
        });
      });
      $(window).bind( 'hashchange', function( event ){
        // get options object from hash
        var hashOptions = $.deparam.fragment();
        $('#filters a.selected').removeClass('selected');
        if(hashOptions.filter === null){ $container.isotope({ filter: "*" }); }
        else {
          $('#filters').find("[data-filter='"+hashOptions.filter+"']").addClass('selected');
          // apply options from hash
          $container.isotope( hashOptions );
        }
      })
      // trigger hashchange to capture any hash data on init
      .trigger('hashchange');
    });
  }// end function iso

  $('#filters a').click(function(){
    $('#filters a.selected').removeClass('selected');
    $(this).addClass('selected');
    var href = $(this).attr('href').replace( /^#/, '' ),
        option = $.deparam( href, false ); // false: coerce for numbers
    $.bbq.pushState( option );
    return false;
  });

  $('#back').click(function(event) {
    event.preventDefault();
    var rgx = /cgrune/i;
    if(document.referrer === undefined || document.referrer === "" || !document.referrer.match(rgx))
      { window.location = window.location.origin; }
    else
      { window.history.back(); }
  });

  // Listen for the ready event for any vimeo video players on the page
  var vimeoPlayers = document.querySelectorAll('iframe'), player;

  for (var i = 0, length = vimeoPlayers.length; i < length; i++) {
    player = vimeoPlayers[i];
    $f(player).addEvent('ready', ready);
  }

  /**
   * Utility function for adding an event. Handles the inconsistencies
   * between the W3C method for adding events (addEventListener) and
   * IE's (attachEvent).
   */
  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false);
    }
    else {
      element.attachEvent('on' + eventName, callback);
    }
  }

  /**
   * Called once a vimeo player is loaded and ready to receive
   * commands. You can add events and make api calls only after this
   * function has been called.
   */
  function ready(player_id) {
    var froogaloop = $f(player_id);
    function setupEventListeners() {
      function onPlay() {
        froogaloop.addEvent('play', function(data) {
            console.log('play event');
            $('body').addClass('dark');
        });
      }
      function onPause() {
        froogaloop.addEvent('pause', function(data) {
            console.log('pause event');
            $('body').removeClass('dark');
        });
      }
      function onFinish() {
        froogaloop.addEvent('finish', function(data) {
            console.log('finish');
            $('body').removeClass('dark');
        });
      }
      onPlay();
      onPause();
      onFinish();
    }
    setupEventListeners();
  }
}); //end doc ready




