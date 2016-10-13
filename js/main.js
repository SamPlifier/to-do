function createItem(text) {
    // build template
    var source = $('#list-item').html();
    var template = Handlebars.compile(source);
    // pass in new todo text
    var context = {
        todoItem: text
    };
    var html = template(context);
    // render template into items list
    $(html).prependTo('ul.items');

}

// keep track of # of li and display total
function updateRemaining() {
    var liTotal = $('.items li').length;
    $('span.incomplete-items').text(liTotal);
}

//initial number of items on the page
var remaining = 0;

//removing active class from each of 3 types of buttons
function clearButtonStyle() {
    $('.show-active, .show-completed, .show-all').removeClass('active');
}
// used event delegation to target parent & remove dynamically present list items
$('.items').on('click', '.delete', function() {
    $(this).parents('li').remove();
    updateRemaining();
});

// checkbox event delegation...remove text if class = completed, clear out text,
$('.items').on('click', '.check', function() {
    if ($(this).next('p').hasClass('completed')) {
        $(this).next('p').removeClass('completed');
    } else {
        $(this).text('x');
        $(this).next('p').addClass('completed');
    }
});

//find and hide all p's with class = completed
// add active class to .show-active button when it's clicked
$('.show-active').on('click', function() {
    clearButtonStyle();
    $('.show-active').addClass('active');
    $('.items').find('li').each(function(item) {
        var p = $(this).find('p');
        if (p && p.hasClass('completed'))
            $(this).hide();
        else
            $(this).show();
    });
});

// find and hide p's without completed class
// add active class to .show-completed button when it's clicked
$('.show-completed').on('click', function() {
    clearButtonStyle();
    $('.show-completed').addClass('active');
    $('.items').find('li').each(function(item) {
        var p = $(this).find('p');
        if (p && !p.hasClass('completed'))
            $(this).hide();
        else
            $(this).show();
    });
});

// show all items regardless of status
$('.show-all').on('click', function() {
    clearButtonStyle();
    $('.show-all').addClass('active');
    $('.items').find('li').each(function(item) {
        $(this).show();
    });
});

// find p's with completed class, remove grandparent
$('.clear').on('click', function() {
    $('.items').find('li').each(function() {
        var p = $(this).find('p');
        if (p && p.hasClass('completed'))
        // ??? grandparent didn't work on W3Schools or here, had to use .parent().parent() ???
            $('.completed').parent().parent().remove();
        var b = $(this).find('button');
        if (b)
            b.text('');
        $(this.completed).remove();
        updateRemaining();
    });
});

// form submission event listener
$('form').on('submit', function(event) {
    event.preventDefault(); //prevent new page load after form submission
    var item = $(this).find('.new-todo').val(); //get value of new-todo
    createItem(item); //call create item funciton
    // clear the text field after submission
    $('.new-todo').val(''); //set new todo value
    updateRemaining(); //call function
});
