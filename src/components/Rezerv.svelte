<script >
    import { onMount } from 'svelte';
    let cardNumber;
    let cardNumberField;
    let res = [];
    let nameString = [];
    let cvvString = [];
    let monthString;
    let yearString;
    let on = false;
    let numberFocus = false;
    let nameFocus = false;
    let dateFocus = false;
    let cardMonths;
    let cardYear;
    let monthMass = ["MM"];
    let monthMass2 = ["MM"];
    let yearMass = ["ГГ"];
    let yearMass2 = ["ГГ"];
    let first;
    let last;
    let thisNumber;
    let thisHolder;
    let thisMonth;
    let thisYear;

    onMount(async () => {
        cardcode.addEventListener('input', formatCardCode);
        cardcode2.addEventListener('input', inputName);
        cardcode5.addEventListener('input', cvv);
        cardcode3.addEventListener('change', changeMonth);
        cardcode4.addEventListener('change', changeYear);



        function formatCardCode() {
            let cardCode = this.value.replace(/[^\d]/g, '').substring(0,16);
            cardCode = cardCode != '' ? cardCode.match(/.{1,4}/g).join(' ') : '';
            this.value = cardCode;
            myform.number.value=this.value.split(" ").join("");


            let mass = cardcode.value.split('');
            res = mass.map((item, index, array) => {
                if(index > 4 && index < 15){
                    if (index == 9 || index == 14){
                        return item = " ";
                    }
                    return item = "*";
                }
                return item;
            });
        }

        function inputName(){
            nameString = this.value.split("");
        }

        function cvv(){
            cvvString = this.value.split("");
        }

        function changeMonth(){
            monthString = this.value;
            //monthMass = [...monthMass, monthString]
            monthMass.push(monthString);
            let div = document.createElement('div');
            div.className = "month";
            div.style.transition = "all 0.5s";
            div.innerHTML = monthString;
            cardMonths.append(div);
            setTimeout(function(){
                document.querySelectorAll(".month")[0].classList.add("up");
                document.querySelector(".up").style.marginTop = "-24px";
                console.log(document.querySelector(".month"));
            }, 100);

            setTimeout(function(){
                document.querySelector(".up").remove();
            }, 500);
        }

        function changeYear(){
            yearString = this.value;
            //monthMass = [...monthMass, monthString]
            yearMass.push(yearString);
            let div = document.createElement('div');
            div.className = "year";
            div.style.transition = "all 0.5s";
            div.innerHTML = yearString.substr(-2);
            cardYear.append(div);
            setTimeout(function(){
                document.querySelectorAll(".year")[0].classList.add("up");
                document.querySelector(".up").style.marginTop = "-24px";
                console.log(document.querySelector(".year"));
            }, 100);

            setTimeout(function(){
                document.querySelector(".up").remove();
            }, 500);
        }

    });

    const active = () => {on = true}
    const deactive = () => {on = false; numberFocus = false; nameFocus = false; dateFocus = false}
    const focusNumber = () => {numberFocus = true}
    const focusName = () => {nameFocus = true}
    const focusDate = () => {dateFocus = true}

</script>

<style>
    .wrap-card {
        position: relative;
    }
    .card {
        display: flex;
        width: 450px;
        height: 270px;
        background-image:  url(/mir-details-01.png), url(/color.jpg);
        background-position: left 30px top 30px, center center;
        background-repeat: no-repeat, no-repeat;
        -webkit-background-size: 15%, 100%;
        background-size: 15%, 100%;
        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;
        padding: 170px 30px 30px;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        font-size: 0;
        flex-wrap: wrap;
        margin-bottom: 30px;
        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
        transform: perspective(2000px) rotateY(0deg) rotateX(0deg) rotate(0deg);
        transform-style: preserve-3d;
        backface-visibility: hidden;
    }
    .card-back {
        display: flex;
        width: 450px;
        height: 270px;
        background-image:  url(/color.jpg);
        background-position: center center;
        background-repeat: no-repeat, no-repeat;
        -webkit-background-size: 100%;
        background-size: 100%;
        -webkit-border-radius: 20px;-moz-border-radius: 20px;border-radius: 20px;
        padding: 170px 30px 30px;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        -webkit-box-shadow: 0 0 0 0 #000;-moz-box-shadow: 0 0 0 0 #000;box-shadow: 0 0 0 0 #000;
        font-size: 0;
        flex-wrap: wrap;
        margin-bottom: 30px;
        position: absolute;
        top: 0;
        left: 0;
        transform-style: preserve-3d;
        box-shadow: 0 20px 60px 0 rgba(14, 42, 90, 0.55);
        -webkit-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -moz-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -ms-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -o-transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        transition: all 0.8s cubic-bezier(0.71, 0.03, 0.56, 0.85);
        -webkit-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -moz-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -ms-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -o-transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        transform: perspective(2000px) rotateY(-180deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        backface-visibility: hidden;
    }
    .wrap-card.active .card {
        -webkit-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);
        -moz-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);
        -ms-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);
        -o-transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);
        transform: perspective(1000px) rotateY(180deg) rotateX(0deg) rotate(0deg);
    }
    .wrap-card.active .card-back {
        -webkit-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -moz-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -ms-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        -o-transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
        transform: perspective(1000px) rotateY(0deg) rotateX(0deg) rotate(0deg) scale(-1, 1);
    }
    .card-number {
        display: flex;
        max-width: 100%;
        width: 100%;
        height: 24px;
        color: #ffffff;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        padding: 0 20px;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        margin-bottom: 20px;
        font-size: 16px;
        overflow: hidden;
    }
    .card-holders {
        display: inline-block;
        width: 255px;
        color: #ffffff;
        font-weight: bold;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        padding: 0;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        font-size: 16px;
        margin-right: 50px;
    }
    .card-months {
        display: inline-block;
        width: 38px;
        height: 25px;
        overflow: hidden;
        color: #ffffff;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        padding: 0 5px;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        font-size: 16px;
        text-align: center;
    }
    .slash {
        color: #ffffff;
        font-size: 16px;
    }
    .card-year {
        display: inline-block;
        width: 38px;
        height: 25px;
        overflow: hidden;
        color: #ffffff;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        padding: 0 5px;
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        font-size: 16px;
        text-align: center;
    }
    .card-number .digit-item:nth-child(5),
    .card-number .digit-item:nth-child(10),
    .card-number .digit-item:nth-child(15) {
        margin-right: 10px;
    }
    .digit-item {
    -webkit-transition: all 1s;-moz-transition: all 1s;-ms-transition: all 1s;-o-transition: all 1s;transition: all 1s;
    }
    .digit-item.active {}
    .input-field {
        width: 450px;
    }
    .input-field input:first-child,
    .input-field input:nth-child(2) {
        width: 100%;
    }
    .card-number .num {
        width: 20px;
        height: 20px;
        overflow: hidden;
        margin-top: 2px;
        margin-bottom: 5px;
        text-align: center;
        line-height: 20px;
        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;
        font-family: 'Bebas Neue';
        font-size: 26px;
    }
    .card-number .num.active {
        -webkit-transform: translate(0, -25px);-moz-transform: translate(0, -25px);-ms-transform: translate(0, -25px);-o-transform: translate(0, -25px);transform: translate(0, -25px);
    }
    .card-number .digit-item:nth-child(6) .num.active,
    .card-number .digit-item:nth-child(7) .num.active,
    .card-number .digit-item:nth-child(8) .num.active,
    .card-number .digit-item:nth-child(9) .num.active,
    .card-number .digit-item:nth-child(11) .num.active,
    .card-number .digit-item:nth-child(12) .num.active,
    .card-number .digit-item:nth-child(13) .num.active,
    .card-number .digit-item:nth-child(14) .num.active {
        line-height: 25px;
    }
    .card-number .num.not-active {
        -webkit-transform: translate(0, -25px);-moz-transform: translate(0, -25px);-ms-transform: translate(0, -25px);-o-transform: translate(0, -25px);transform: translate(0, -25px);
    }
    .card-holders {
        display: flex;
        height: 24px;
        overflow: hidden;
        padding-left: 5px;
        flex-wrap: wrap;
    }
    .card-holders .num {
        width: 12px;
        height: 20px;
        overflow: hidden;
        margin-top: 2px;
        margin-bottom: 5px;
        text-align: center;
        font-size: 11px;
        line-height: 20px;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        -webkit-transform: translate(15px, -25px) rotate(90deg);
        -moz-transform: translate(15px, -25px) rotate(90deg);
        -ms-transform: translate(15px, -25px) rotate(90deg);
        -o-transform: translate(15px, -25px) rotate(90deg);
        transform: translate(15px, -25px) rotate(90deg);
        text-transform: uppercase;
        font-weight: normal;
        font-family: 'Bebas Neue';
        font-size: 20px;
    }
    .card-holders .num.active {
        -webkit-transform: translate(0, -25px) rotate(0deg);
        -moz-transform: translate(0, -25px) rotate(0deg);
        -ms-transform: translate(0, -25px) rotate(0deg);
        -o-transform: translate(0, -25px) rotate(0deg);
        transform: translate(0, -25px) rotate(0deg);
    }
    .card-holders .num.not-active {
        -webkit-transform: translate(0, -25px) rotate(0deg);
        -moz-transform: translate(0, -25px) rotate(0deg);
        -ms-transform: translate(0, -25px) rotate(0deg);
        -o-transform: translate(0, -25px) rotate(0deg);
        transform: translate(0, -25px) rotate(0deg);
    }
    .placeholder {
        width: 100%;
        max-width: 100%;
        font-family: 'Bebas Neue';
        font-size: 20px;
        line-height: 25px;
        letter-spacing: 4.4pt;
        text-indent: 5px;
        font-weight: normal;
    }
    .placeholder.active {
        width: 100%;
        max-width: 100%;
        -webkit-transition: all 0.2s;-moz-transition: all 0.2s;-ms-transition: all 0.2s;-o-transition: all 0.2s;transition: all 0.2s;
    }
    .placeholder.not-active {
        margin-top: -25px;
    }
    #cardcode {
        height: 50px;
        padding: 5px 15px;
        border: 1px solid #ced6e0;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    #cardcode2 {
        height: 50px;
        padding: 5px 15px;
        border: 1px solid #ced6e0;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    #cardcode3 {
        height: 50px;
        padding: 5px 15px;
        border: 1px solid #ced6e0;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    #cardcode4 {
        height: 50px;
        padding: 5px 15px;
        border: 1px solid #ced6e0;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    #cardcode5 {
        height: 50px;
        padding: 5px 15px;
        border: 1px solid #ced6e0;
        -webkit-border-radius: 5px;-moz-border-radius: 5px;border-radius: 5px;
        margin-bottom: 20px;
        box-sizing: border-box;
    }
    .card-item-band {
        background: rgba(0, 0, 19, 0.8);
        width: 100%;
        height: 50px;
        margin-top: 30px;
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
    }
    .card-item-cvv {
        width: 300px;
        height: 45px;
        background: #fff;
        margin-bottom: 30px;
        text-align: right;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 10px;
        color: #1a3b5d;
        font-size: 18px;
        border-radius: 4px;
        box-shadow: 0px 10px 20px -7px rgba(32, 56, 117, 0.35);
        -webkit-transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        transform: scale(-1, 1);
        position: absolute;
        right: 30px;
        top: 100px;
        left: auto;
    }
    .star {
        -webkit-transform: translate(0, 3px);
        -moz-transform: translate(0, 3px);
        -ms-transform: translate(0, 3px);
        -o-transform: translate(0, 3px);
        transform: translate(0, 3px);
    }
    .three {
        width: 100%;
        max-width: calc(33.33% - 3px);
    }
    .cvv-label {
        position: absolute;
        top: 105px;
        left: 45px;
        color: #ffffff;
        font-size: 23px;
        -webkit-transform: scale(-1, 1);
        -moz-transform: scale(-1, 1);
        -ms-transform: scale(-1, 1);
        -o-transform: scale(-1, 1);
        transform: scale(-1, 1);
        text-shadow: 0px 4px 4px #000000;
        letter-spacing: 3pt;
    }
    button {
        width: 100%;
        height: 55px;
        background: #2364d2;
        border: none;
        border-radius: 5px;
        font-size: 22px;
        font-weight: 500;
        font-family: "Source Sans Pro", sans-serif;
        box-shadow: 3px 10px 20px 0px rgba(35, 100, 210, 0.3);
        color: #fff;
        margin-top: 20px;
        cursor: pointer;
    }
    .month,
    .year {
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s !important;
    }
    .month.up,
    .year.up {
        margin-top: -24px !important;
    }
    .focus {
        position: absolute;
        top: 0;
        left: 0;
        width: 450px;
        height: 270px;
        z-index: 3;
        border: 2px solid #ffffff;
        -webkit-border-radius: 14px;-moz-border-radius: 14px;border-radius: 14px;
        background-color: rgba(0,0,0,0.3);
        -webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;
        -webkit-transition: all 0.5s;
        -moz-transition: all 0.5s;
        -ms-transition: all 0.5s;
        -o-transition: all 0.5s;
        transition: all 0.5s;
        opacity: 0;
    }
    .focus.focus-number {
        top: 161px;
        left: 41px;
        width: 367px;
        height: 40px;
        z-index: 3;
        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;
        opacity: 1;
    }
    .focus.focus-name {
        top: 206px;
        left: 29px;
        width: 257px;
        height: 40px;
        z-index: 3;
        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;
        opacity: 1;
    }
    .focus.focus-date {
        top: 206px;
        left: 330px;
        width: 95px;
        height: 40px;
        z-index: 3;
        -webkit-border-radius: 4px;-moz-border-radius: 4px;border-radius: 4px;
        opacity: 1;
    }
    .card-fake-number {
        position: absolute;
        top: 161px;
        left: 41px;
        width: 367px;
        height: 40px;
        z-index: 3;
        cursor: pointer;
        z-index: 4;
    }
    .card-fake-holder {
        position: absolute;
        top: 206px;
        left: 29px;
        width: 257px;
        height: 40px;
        cursor: pointer;
        z-index: 4;
    }
    .card-fake-month {
        position: absolute;
        top: 206px;
        left: 330px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 4;
    }
    .card-fake-year {
        position: absolute;
        top: 206px;
        left: 375px;
        width: 40px;
        height: 40px;
        cursor: pointer;
        z-index: 4;
    }
</style>

<div class="wrap-card {on ? 'active' : ''}">
    <div class="card">
    <div class="focus {numberFocus ? 'focus-number' : ''} {nameFocus ? 'focus-name' : ''} {dateFocus ? 'focus-date' :
         ''}"></div>
        <div class="card-number" id="cardNumberField" bind:this={cardNumberField}>
            <div class="digit-item">
                <div class="num {res.length > 0 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 0 ? 'active' : ''}">{res[0] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 1 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 1 ? 'active' : ''}">{res[1] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 2 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 2 ? 'active' : ''}">{res[2] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 3 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 3 ? 'active' : ''}">{res[3] || ""}</div>
            </div>
            <div class="digit-item"></div>
            <div class="digit-item">
                <div class="num {res.length > 5 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 5 ? 'active' : ''}">{res[5] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 6 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 6 ? 'active' : ''}">{res[6] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 7 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 7 ? 'active' : ''}">{res[7] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 8 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 8 ? 'active' : ''}">{res[8] || ""}</div>
            </div>
            <div class="digit-item"></div>
            <div class="digit-item">
                <div class="num {res.length > 10 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 10 ? 'active' : ''}">{res[10] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 11 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 11 ? 'active' : ''}">{res[11] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 12 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 12 ? 'active' : ''}">{res[12] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 13 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 13 ? 'active' : ''}">{res[13] || ""}</div>
            </div>
            <div class="digit-item"></div>
            <div class="digit-item">
                <div class="num {res.length > 15 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 15 ? 'active' : ''}">{res[15] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 16 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 16 ? 'active' : ''}">{res[16] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 17 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 17 ? 'active' : ''}">{res[17] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {res.length > 18 ? 'not-active' : ''}">#</div>
                <div class="num {res.length > 18 ? 'active' : ''}">{res[18] || ""}</div>
            </div>
        </div>
        <div class="card-holders">
            <div class="placeholder {nameString.length == 0 ? 'active' : 'not-active'}">
                IVAN IVANOV
            </div>
            <div class="digit-item">
                <div class="num {nameString.length < 0 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 0 ? 'active' : ''}">{nameString[0] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 1 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 1 ? 'active' : ''}">{nameString[1] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 2 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 2 ? 'active' : ''}">{nameString[2] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 3 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 3 ? 'active' : ''}">{nameString[3] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 4 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 4 ? 'active' : ''}">{nameString[4] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 5 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 5 ? 'active' : ''}">{nameString[5] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 6 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 6 ? 'active' : ''}">{nameString[6] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 7 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 7 ? 'active' : ''}">{nameString[7] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 8 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 8 ? 'active' : ''}">{nameString[8] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 9 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 9 ? 'active' : ''}">{nameString[9] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 10 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 10 ? 'active' : ''}">{nameString[10] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 11 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 11 ? 'active' : ''}">{nameString[11] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 12 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 12 ? 'active' : ''}">{nameString[12] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 13 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 13 ? 'active' : ''}">{nameString[13] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 14 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 14 ? 'active' : ''}">{nameString[14] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 15 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 15 ? 'active' : ''}">{nameString[15] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 16 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 16 ? 'active' : ''}">{nameString[16] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 17 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 17 ? 'active' : ''}">{nameString[17] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 18 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 18 ? 'active' : ''}">{nameString[18] || ""}</div>
            </div>
            <div class="digit-item">
                <div class="num {nameString.length > 19 ? 'not-active' : ''}"> </div>
                <div class="num {nameString.length > 19 ? 'active' : ''}">{nameString[19] || ""}</div>
            </div>
        </div>
        <div class="card-months" bind:this={cardMonths}>
            <div class="month">MM</div>
        </div>
        <div class="slash">/</div>
        <div class="card-year" bind:this={cardYear}>
            <div class="year">ГГ</div>
        </div>
        <div class="card-fake-number" on:mousedown="{(e) => {e.preventDefault();thisNumber.focus();}}"></div>
        <div class="card-fake-holder" on:mousedown="{(e) => {e.preventDefault();thisHolder.focus();}}"></div>
        <div class="card-fake-month" on:mousedown="{(e) => {e.preventDefault();thisMonth.focus();}}"></div>
        <div class="card-fake-year" on:mousedown="{(e) => {e.preventDefault();thisYear.focus();}}"></div>
    </div>
    <div class="card-back">
        <div class="card-item-band"></div>
        <div class="card-item-cvv">
            {#each cvvString as cvvDigit}
                <div class="star">*</div>
            {/each}
        </div>
        <div class="cvv-label">CVV</div>
    </div>
</div>
<form name="myform" class="input-field">
    <input type="text" class="input-number" id="cardcode" placeholder="Номер карты" on:focus={focusNumber}
    on:blur={deactive} bind:this={thisNumber}>
    <input type="text" class="input-name" id="cardcode2" placeholder="Имя Фамилия" on:focus={focusName}
    on:blur={deactive} bind:this={thisHolder}>
    <select id="cardcode3" class="three" on:focus={focusDate} on:blur={deactive} bind:this={thisMonth}>
        <option selected disabled>Месяц</option>
        <option>01</option>
        <option>02</option>
        <option>03</option>
        <option>04</option>
        <option>05</option>
        <option>06</option>
        <option>07</option>
        <option>08</option>
        <option>09</option>
        <option>10</option>
        <option>11</option>
        <option>12</option>
    </select>
    <select id="cardcode4" class="three" on:focus={focusDate} on:blur={deactive} bind:this={thisYear}>
        <option selected disabled>Год</option>
        <option>2019</option>
        <option>2020</option>
        <option>2021</option>
        <option>2022</option>
        <option>2023</option>
        <option>2024</option>
        <option>2025</option>
        <option>2026</option>
        <option>2027</option>
        <option>2028</option>
        <option>2029</option>
        <option>2030</option>
    </select>
    <input type="text" id="cardcode5" placeholder="CVV" on:focus={active} on:blur={deactive} maxlength="4"
    class="three">
    <input type=hidden name=number value="">
    <button type="submit">Отправить</button>
</form>