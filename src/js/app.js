var main_content = $('.main-content');

var changePage = function(page) {
	main_content.load('src/pages/' + page + '.html')
}

changePage('about');
