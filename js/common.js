/* 
 *   Wrighting day: 2018. 11.15
 *   Modifying day: 2019. 01.02
 */
$(document).ready(function() {

    //tooltip 추가 181220
    $(document).tooltip({
        show: null,
        position: {
            my: "left top",
            at: "left bottom"
        },
        //track:true, 
        // 마우스 위치에 따른 툴팁 포지션 변경
        open: function( event, ui ) {
        ui.tooltip.animate({ top: ui.tooltip.position().top + 5 }, "fast" );
      }
    });

    //table 
    $('.tblType1 table td').mouseover(function(){
        var tdW = $(this).width();
        var childW = $(this).children().width();
        var tool = $(this).children().text(); 

        if( childW > tdW ){
            $(this).children().attr('title' , tool);
        }
    });

    $('.tblType1 table td').mouseleave(function(){

        var tdW = $(this).width();
        var childW = $(this).children().width();
        var tool = $(this).children().text(); 

        if( childW > tdW ){
            $(this).children().attr('title' , '');
        }  
    });


    //고장내역 조직별리포트
    $('.sameLo .rank ul li .rank_tit').mouseover(function(){

        var tdW = $(this).width();
        var childW = $(this).children('.rang').width() - 16;
        var tool = $(this).children('.rang').text(); 

        if( childW > tdW ){
            $(this).children('.rang').attr('title' , tool);
        }
    });

    $('sameLo .rank ul li .rank_tit').mouseleave(function(){

        var tdW = $(this).width();
        var childW = $(this).children().width() - 16;
        var tool = $(this).children().text(); 

        if( childW > tdW ){
            $(this).children('.rang').attr('title' , '');
        }  
    });

    //수리내역 종합대시보드
    $('.content .vender .rank .rank_tit').mouseover(function(){
        var tdW = $(this).width();
        var childW = $(this).children('.rang2').width();
        var tool = $(this).children('.rang2').text(); 

        if( childW > tdW ){
            $(this).children('.rang2').attr('title' , tool);
        }
    });

    $('.content .vender .rank .rank_tit').mouseleave(function(){
        var tdW = $(this).width();
        var childW = $(this).children('.rang2').width();
        var tool = $(this).children('.rang2').text(); 

        if( childW > tdW ){
            
            $(this).children('.rang2').attr('title' , '');
        }
    });

    // 로그인 레이어팝업
    $('.js-open').click(function(e) {
        e.preventDefault();
        var activeLayer = $(this).attr('data-pop');
        $('#' + activeLayer).removeClass('hidden');

        $('.js-close').click(function() {
            $('.js-layer').addClass('hidden');
        });
    });

    // 팝업2
    $('.js-open2').click(function(e){
        
        e.preventDefault();
        $('.dimm').show();
        popupOpen();
        $('.userDp2').hide();

        var activeLayer = $(this).attr('data-pop');
        $('#' + activeLayer).removeClass('hidden');

        $('.layer2-close').click(function(){

            $('.dimm').hide();
            popupClose();
            $('#' + activeLayer).addClass('hidden');
        });

        $('.dimm').click(function(){
            $(this).hide();
            popupClose();
            $('#' + activeLayer).addClass('hidden');
        });
    });

    

    //------------- 사이드메뉴 start ------------------
    $('#subTab a').on('click', function() {

        var activeTab = $(this).attr('data-tab');

        $('#sideMenu .tabs a').removeClass('active');
        $('#sideMenu .dp2').removeClass('active');
        $('#sideMenu .dp2 ul li').removeClass('active');
        
        $(this).addClass('active');
        $('#' + activeTab).addClass('active');
        $('#' + activeTab).find('ul li:first-child').addClass('active');

    });

    $('#sideMenu .dp2 ul li a').on('click', function() {

            $('#sideMenu .dp2 ul li').removeClass('active');
            $(this).parent().addClass('active');

      });

    // 사용자 정보
    $('.userInfo .user').on('click', function(e) {
        e.preventDefault();
        $('.userInfo .userDp2').slideToggle(100);

        $('.userClose').click(function(e){
            e.preventDefault();
            $(this).parent().parent().slideUp(100);
        });

        $('body').click(function(e){
            if( $('.userInfo').has(e.target).length === 0 ){
                 $('.userDp2').hide();
            }
        });

    });

    //------------- 시설구분 start ------------------
    $('.typeList > span').on('click', function() {
        $(this).parent().toggleClass('on');
        $(this).parent().find('ul').stop().slideToggle(100);

        $('body').click(function(e){
            if( $('.typeList').has(e.target).length === 0 ){
                 $('.typeList').removeClass('on');
                 $('.typeList > ul').hide();
            }
        });
    });

   var checkBoxObj = $('.typeList > ul > li > input[type="checkbox"]');
   
   //checkBox 이벤트 연결
   checkBoxObj.change(function(){
      var typeBoxText = "";
      var total = checkBoxObj.length;
      var checkCnt = 0;
      //check된 Label값 확인
      checkBoxObj.each(function(index, item){
         if($(item).is(":checked")){
            checkCnt++;
            //2개이상 선택시 , 추가
            if(checkCnt >= 2) {
               typeBoxText += ", "
            }
            typeBoxText += $('label[for='+item.id+']').text();
         }
         if(checkCnt == total) {
            typeBoxText = "전체";
         } else if (checkCnt == 0 && index + 1 == total) {
            typeBoxText = "선택";
         }
      });
      $('#typeBox').text(typeBoxText);
   });



    //------------- 상세검색 start ------------------
    $('.btn-detail').on('click', function() {
        $('.searchDetail').stop().slideToggle();
    });

    $('.searchDetail .closeEvent').on('click', function(e) {
        e.preventDefault();
        $('.searchDetail').stop().slideUp();
        $('.locationName').hide();
    });

    //조직 추가 
    $(document).on('click', '.appendDiv .plus', function(){
           var copy = $(this).parent().clone()
           var idx = $('.appendDiv').length + 1

           $(this).parent().parent().append('<div class="appendDiv"><span class="tit">구분<span>'+ idx +'</span></span> <select class="sd-control"><option value="">전체</option><option value="">1</option><option value="">2</option><option value="">3</option></select> <select class="sd-control"><option value="">전체</option><option value="">1</option><option value="">2</option><option value="">3</option></select> <button type="button" class="btn-append plus"></button> <button type="button" class="btn-append minus"></button></div>');
           $('.appendDiv .minus').on('click' , function(){
                $(this).parent('.appendDiv').remove();
            });           
    });
    

    //국소명 검색
    $('.c-local').click(function(){

        $('.locationName').removeClass('on');
        $(this).next().addClass('on');

        $('.loClose').on('click', function() {
            $('.locationName').removeClass('on');
        });

        $('.locationName .s_af ul li').on('click' , function(){

            var safTxt = $(this).text();

            $('.locationName .s_af ul li').removeClass('active');
            $(this).addClass('active');

            $('#test1').val(safTxt);
        });

        $('.loDel').click(function(){
            $('.locationName').removeClass('on');
            $('#test1').val('');
        });

        $('select.sd-control').focus(function(){
            if( $(this).not('.c-local') ){
                $('.locationName').removeClass('on');
            }
        });

    });   

    //datepicker
    //1주일
    $('.btn_date.week').on('click', function() {
        week();

        $('.btn_date').removeClass('on');
        $(this).addClass('on');
    });

    //1개월
    $('.btn_date.month').on('click', function() {
        month();

        $('.btn_date').removeClass('on');
        $(this).addClass('on');
    });

    //3개월
    $('.btn_date.month3').on('click', function() {
        month3();

        $('.btn_date').removeClass('on');
        $(this).addClass('on');
    });

    //1주일
    function week(){
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showButtonPanel: true // 버튼 보여주기
            ,buttonImageOnly: true
            ,buttonImage: "images/icon_date.png"
            ,buttonText: "날짜를 선택해 주세요."
            ,changeMonth: true //콤보박스에서 월 선택 가능                
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시                
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            //,minDate: "-7D" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+7D" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
        });

        //input을 datepicker로 선언
        $("#startDate").datepicker();                    
        $("#endDate").datepicker();
        
        //From의 초기값을 오늘 날짜로 설정
        $('#startDate').datepicker('setDate', '-7D'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        //To의 초기값을 내일로 설정
        $('#endDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    }

    week();

    //1개월
    function month(){
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showButtonPanel: true // 버튼 보여주기
            ,buttonImageOnly: true
            ,buttonImage: "images/icon_date.png"
            ,buttonText: "날짜를 선택해 주세요."
            ,changeMonth: true //콤보박스에서 월 선택 가능                
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시                
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            //,minDate: "-1M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+1M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
        });

        //input을 datepicker로 선언
        $("#startDate").datepicker();                    
        $("#endDate").datepicker();
        
        //From의 초기값을 오늘 날짜로 설정
        $('#startDate').datepicker('setDate', '-1M'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        //To의 초기값을 내일로 설정
        $('#endDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    }

    //3개월
    function month3(){
        $.datepicker.setDefaults({
            dateFormat: 'yy-mm-dd' //Input Display Format 변경
            ,showOtherMonths: true //빈 공간에 현재월의 앞뒤월의 날짜를 표시
            ,showButtonPanel: true // 버튼 보여주기
            ,buttonImageOnly: true
            ,buttonImage: "images/icon_date.png"
            ,buttonText: "날짜를 선택해 주세요."
            ,changeMonth: true //콤보박스에서 월 선택 가능                
            ,showOn: "both" //button:버튼을 표시하고,버튼을 눌러야만 달력 표시 ^ both:버튼을 표시하고,버튼을 누르거나 input을 클릭하면 달력 표시                
            ,yearSuffix: "년" //달력의 년도 부분 뒤에 붙는 텍스트
            ,monthNamesShort: ['1','2','3','4','5','6','7','8','9','10','11','12'] //달력의 월 부분 텍스트
            ,monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'] //달력의 월 부분 Tooltip 텍스트
            ,dayNamesMin: ['일','월','화','수','목','금','토'] //달력의 요일 부분 텍스트
            ,dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'] //달력의 요일 부분 Tooltip 텍스트
            //,minDate: "-3M" //최소 선택일자(-1D:하루전, -1M:한달전, -1Y:일년전)
            ,maxDate: "+3M" //최대 선택일자(+1D:하루후, -1M:한달후, -1Y:일년후)                    
        });

        //input을 datepicker로 선언
        $("#startDate").datepicker();                    
        $("#endDate").datepicker();
        
        //From의 초기값을 오늘 날짜로 설정
        $('#startDate').datepicker('setDate', '-3M'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
        //To의 초기값을 내일로 설정
        $('#endDate').datepicker('setDate', 'today'); //(-1D:하루전, -1M:한달전, -1Y:일년전), (+1D:하루후, -1M:한달후, -1Y:일년후)
    }
    
    $('.category > li.date .sd-control').focus(function(){
        $('.sd-body .category .btn_date').removeClass('on');
    });

    //------------- 이슈리포트 start ------------------
    // 이슈 리포트 - 분류별 현황
    $('.contTab ul li').on('click' , function(){
        $('.contTab ul li').removeClass('active');
        $(this).addClass('active');
    });

    //이슈리포트 - 이슈별 발생 국소
    $('.row .issue .top5 li a').click(function(e){
        e.preventDefault();
        $('.row .issue .top5 li a').removeClass('active');
        $(this).addClass('active');
    });

    //이슈리포트 - 이슈별 발생 국소 select box 
    $( "#custom1" ).selectmenu().selectmenu( "menuWidget" ).addClass( "h260" );
    $( "#custom2" ).selectmenu().selectmenu( "menuWidget" ).addClass( "h260" );


    //------------- progress bar start ------------------
    // progress bar
    $('#prog1').progressbar({
        value: 75
    });

    $('#prog2').progressbar({
        value: 50
    });

    $('#prog3').progressbar({
        value: 90
    });

    $('#prog4').progressbar({
        value: 80
    });

    $('#prog5').progressbar({
        value: 30
    });

    $('#prog6').progressbar({
        value: 10
    });

    $('#prog7').progressbar({
        value: 75
    });
    $('#prog8').progressbar({
        value: 50
    });
    $('#prog9').progressbar({
        value: 90
    });
    $('#prog10').progressbar({
        value: 80
    });
    $('#prog11').progressbar({
        value: 30
    });
    $('#prog12').progressbar({
        value: 10
    });
    $('#prog13').progressbar({
        value: 75
    });
    $('#prog14').progressbar({
        value: 50
    });
    $('#prog15').progressbar({
        value: 90
    });
    $('#prog16').progressbar({
        value: 80
    });

    $('#prog17').progressbar({
        value: 10
    });
    $('#prog18').progressbar({
        value: 60
    });
    $('#prog19').progressbar({
        value: 50
    });
    $('#prog20').progressbar({
        value: 40
    });
    $('#prog21').progressbar({
        value: 100
    });
    $('#prog22').progressbar({
        value: 90
    });
    $('#prog23').progressbar({
        value: 80
    });
    $('#prog24').progressbar({
        value: 60
    });
    $('#prog25').progressbar({
        value: 40
    });
    $('#prog26').progressbar({
        value: 20
    });
    $('.p75').progressbar({
        value: 75
    });
    $('.p50').progressbar({
        value: 50
    });
    $('.p90').progressbar({
        value: 90
    });
    $('.p80').progressbar({
        value: 80
    });
    $('.p30').progressbar({
        value: 30
    });

    //progressbar tooltip
    $('.rank_bar').hover(function(){

        var valW = $(this).parent().find('.ui-progressbar-value').width();
        $(this).find('.tool_progress').show().css('left', valW);


    }, function(){
         $(this).find('.tool_progress').hide();
    });

    //progressbar bg 
    var rangH = $('.rank > ul').height();
    $('.rank_bg > span').height(rangH).css('padding-top' , rangH);
    
    //------------- 집계기간 start ------------------
    //버튼 클릭이벤트  
    $('.detailWrap .period .btn').on('click', function() {
        $('.detailWrap .period .btn').removeClass('on');
        $(this).addClass('on');
    });

    /* 날짜 객체 받아서 문자열로 리턴하는 함수 */
    function getDateStr(myDate){
        return (myDate.getFullYear() + '.' + (myDate.getMonth() + 1) + '.' + myDate.getDate())
    }

    /* 오늘 날짜를 문자열로 반환 */
    function today() {
      var d = new Date()
      return getDateStr(d)
    }

    /* 오늘로부터 1주일전 날짜 반환 */
    function lastWeek() {
      var d = new Date()
      var dayOfMonth = d.getDate()
      d.setDate(dayOfMonth - 7)
      return getDateStr(d)
    }

    /* 오늘로부터 1개월전 날짜 반환 */
    function lastMonth() {
      var d = new Date()
      var monthOfYear = d.getMonth()
      d.setMonth(monthOfYear - 1)
      return getDateStr(d)
    }

    $('#sDate').text(today());
    $('#eDate').text(today());

    $('#btnDay').click(function(){
        $('#sDate').text(today());
        $('#eDate').text(today());
    });

    $('#btnWeek').click(function(){
        $('#sDate').text(lastWeek());
        $('#eDate').text(today());
    });

    $('#btnMonth').click(function(){
        $('#sDate').text(lastMonth());
        $('#eDate').text(today());
    });

    //------------- etc ------------------
    //tooltip
    $('.tooltip').on('click' , function(){
        $(this).next().toggleClass('on');

        $('.tool_close').click(function(){
            $(this).parent().removeClass('on');
        });
    });

    //download button 
    $('.btn-download').hover(function(){
        $(this).addClass('on');
        $(this).find('span').text('EXEL');

    }, function(){
         $(this).removeClass('on');
         $(this).find('span').text('DOWNLOAD');
    });

    $('.pagingBtn .btn').click(function(e){
        e.preventDefault();
    });

    

    //팝업띄울시 스크롤 고정
    var scrollHeight = 0;

    function popupOpen() {
        scrollHeight = $("body").scrollTop(); // [var사용하지 않았으므로 전역스코프로 정의됨]열렸을떄 scrollTop 체크
        console.log(scrollHeight);
        $("body, html").addClass('layer-open'); //overflow:hidden 추가
        $('#wrap').css('position', 'absolute'); //최상위 div 고정
        $('#wrap').css('top', - scrollHeight);// 최상위 div에 현재 스크롤된값 = 보이는화면만큼 top값 추가
        $('#footer').css({ 'position':'fixed' , 'bottom': -50 });
    }

    //팝업닫을때 스크롤 해제
    function popupClose() {

        $("body, html").removeClass("layer-open"); //overflow-hidden 해제(스크롤 해제)
        $('#wrap').css('top', 0);//최상위 div 고정해제
        $('#wrap').css('position', 'relative');//top값 해제
        $("body").scrollTop(scrollHeight); //[popupOpen()일때의 의도적 전역변수 scrollHeight값]현재 스크롤된값=보이는화면
        $('#footer').css({ 'position':'relative' , 'bottom':'auto' });
    }





});

