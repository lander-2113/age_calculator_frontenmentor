var form = document.getElementById("age-form");
form.addEventListener("hover", ()=>{
    document.querySelector("#age-form > input").style.backgroundColor = "black";
});
// handle lable error styling
var daylabel = form.querySelector(".form-grid .a1");
var monthLable = form.querySelector(".form-grid .a2");
var yearLabel = form.querySelector(".form-grid .a3");
// handle input
var dayInput = form.querySelector("#day")
var monthInput = form.querySelector("#month");
var yearInput = form.querySelector("#year");

// error display
var dayError = form.querySelector(".form-grid .e1");
var monthError = form.querySelector(".form-grid .e2");
var yearError = form.querySelector(".form-grid .e3");

// change color of label and input
function state(color) {
    //#FEC6C3
    daylabel.style.color = color;
    monthLable.style.color = color;
    yearLabel.style.color = color;

    dayInput.style.borderColor = color;
    monthInput.style.borderColor = color;
    yearInput.style.borderColor = color;
}
// to validate day if month is feb and leap
function leapYear(year) {
    if(year%4=== 0) {
        if(year %100 !== 0){
            return true;
        }
        if(year % 400 !== 0) {
            return false;
        }
        return true;
    }

    return false;
}

    form.addEventListener("submit", (e)=>{
        // reset the error states if any
        var labels = document.querySelectorAll("#age-form .form-grid label");
        console.log(labels);
        for(var i = 0; i < labels.length; i++) {
            labels[i].style.color = "rgba(0, 0, 0, 0.6)";
        }

        var inputs = document.querySelectorAll("#age-form .form-grid input");
        for(let i=0; i < inputs.length; i++) {
            inputs[i].style.borderColor = "rgba(0, 0, 0, 0.3)";
        }
        
        dayError.style.display = "none";
        monthError.style.display = "none";
        yearError.style.display = "none";
        var flag = false;
        e.preventDefault();
        var day = dayInput.value;
        var month = monthInput.value;
        var year = yearInput.value;
        console.log(parseInt(day) + " " + parseInt(month) + " " + parseInt(year) );
        // requried 
        if(day.length === 0) {
            state("#D85859");
            dayError.innerText = "This field is required";
            dayError.style.display = "block";
            flag = true;
        }

        if(month.length === 0) {
            state("#D85859");
            monthError.innerText = "This field is required";
            monthError.style.display = "block";
            flag = true;
        }

        if(year.length === 0 ){
            state("rgba(216, 88, 89)");
            yearError.innerText = "This field is required";
            yearError.style.display = "block";
            flag = true;
        }

        // validate if string
        function isInt(n) {
            for(let i=0; i < n.length; i++) {
                if(n[i] < '0' || n[i] > '9'){
                    flag = true;
                    state("#D85859");
                    return;
                }
            }
        }
        isInt(day);isInt(month);isInt(year);

        // convert to int
        day = parseInt(dayInput.value);
        month = parseInt(monthInput.value);
        year = parseInt(yearInput.value);
        // must be a valid day month year
        if(day < 1 || day > 31) {
            state("#D85859");
            dayError.innerText = "Must be a valid day";
            dayError.style.display = "block";  
            flag = true;          
        }

        if(month < 1 || month > 12) {
            state("#D85859");
            monthError.innerText = "Must be a valid month";
            monthError.style.display = "block";
            flag = true;
        }

        if(year > new Date().getFullYear()) {
            state("#D85859");
            yearError.innerText = "Must be in the past";
            yearError.style.display = "block";
            flag = true;
        }

        if(year < 1) {
            state("#D85859");
            yearError.innerText = "Must be a valid year";
            yearError.style.display = "block";
            flag = true;
        }

        if(leapYear(year) && month === 2) {
            if(day > 29) {
                state("#D85859");
                dayError.innerText = "Must be a valid day";
                dayError.style.display = "block"; 
                flag = true;  

            }
        }else if(month === 2) {
            if(day > 28) {
                state("#D85859");
                dayError.innerText = "Must be a valid day";
                dayError.style.display = "block";
                flag = true;
            }
        }

        function getAge(birth_date, birth_month, birth_year){
            var current_date = new Date().getDate();
            var current_month = new Date().getMonth();
            var current_year = new Date().getFullYear();

            // days of every month  
            month = [31, 28, 31, 30, 31, 30, 31,  
                31, 30, 31, 30, 31 ] 

            if (birth_date > current_date) {  
            current_date = current_date + month[birth_month - 1];  
            current_month = current_month - 1;  
            } 
            if (birth_month > current_month) {  
                current_year = current_year - 1;  
                current_month = current_month + 12;
            }  

            // calculate date, month, year  
            var calculated_date = current_date - birth_date;  
            var calculated_month = current_month - birth_month;  
            var calculated_year = current_year - birth_year;
            // display day
            var dayTag = document.querySelector(".container .output p:nth-child(3) span:first-child");
            // display month
            var monthTag = document.querySelector(".container .output p:nth-child(2) span:first-child");
            // display year
            var yearTag = document.querySelector(".container .output p:nth-child(1) span:first-child");
            dayTag.innerText = calculated_date;
            monthTag.innerText = calculated_month;
            yearTag.innerText = calculated_year;

            console.log(calculated_date + " " + calculated_month + " " + calculated_year);

        }
        // if no error show age.
        if(!flag) {
            getAge(day, month, year);
        }
    });