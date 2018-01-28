$(function() {
    var currentStep = 0;
    var rowSection = $("section#row");
    var lengthSection = $("section#row").length;
    var calcHeight = $("section#row").height();
    console.log(calcHeight);
    

    $('#container-full').on('mousewheel', function(event) {
        event.preventDefault();

        function normalize(e) {
            var delta = e.deltaY || e.detail || (-e.wheelDelta);
            return delta /= Math.abs(delta);
        }

        var scrollTop = this.scrollTop;
        this.scrollTop = (scrollTop + ((event.deltaY * event.deltaFactor) * -1));
        //console.log(event.deltaX, event.deltaY, event.deltaFactor);

        if(event.deltaY > 0){
            currentStep++;
            window.scrollTo(0,event.deltaY);
            console.log("currentStep++", currentStep);
        }

        else{
            currentStep--;
            console.log("currentStep--", currentStep);
        }

    });
    


});