<script setup lang="ts">
</script>

<template>
    <div class="tech-stack">
        <div class="tech-stack-left">
            <span>
                My Work Experience
            </span>

            <div class="history-tl-container">
                <ul class="tl">
                    <li class="tl-item" ng-repeat="item in retailer_history">
                        <div class="item-title">Intern</div>
                        <div class="item-detail">Don't forget the ring</div>
                    </li>
                    <li class="tl-item" ng-repeat="item in retailer_history">
                        <div class="item-title">HatYai</div>
                        <div class="item-detail">Don't enter the caves!!</div>
                    </li>
                    <li class="tl-item" ng-repeat="item in retailer_history">
                        <div class="item-title">Bangkok</div>
                        <div class="item-detail">Also, throw that Gollum too</div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="tech-stack-right">
            Tech Stack
            <div class="tech-stack-grid">
                <div class="tech-stack-grid-item grid-2">2</div>
                <div class="tech-stack-grid-item grid-3">3</div>
                <div class="tech-stack-grid-item grid-4">4</div>
                <div class="tech-stack-grid-item grid-5">5</div>
                <div class="tech-stack-grid-item grid-6">6</div>
                <div class="tech-stack-grid-item grid-7">7</div>
                <div class="tech-stack-grid-item grid-8">8</div>
                <div class="tech-stack-grid-item grid-9">9</div>
                <div class="tech-stack-grid-item grid-10">10</div>
                <div class="tech-stack-grid-item grid-11">11</div>
                <div class="tech-stack-grid-item grid-12">12</div>
                <div class="tech-stack-grid-item grid-13">13</div>
                <div class="tech-stack-grid-item grid-14">14</div>
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
// Tech Stack
.tech-stack {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 75%;
    margin: auto;
    padding: 2rem 0;
    border: 1px solid red;
}

.tech-stack-left {
    width: 30%;
    height: 100%;
    border: 1px solid red;
}

.tech-stack-right {
    width: 70%;
    height: 100%;
    border: 1px solid red;
}

// Tech Stack Left
.history-tl-container {
    padding: 2rem 0;
}

.history-tl-container ul.tl li {
    position: relative;
    list-style: none;
    margin: auto;
    min-height: 200px;
    border-left: 1px dashed gray;
    padding-left: 30px;
}

.history-tl-container ul.tl li:last-child { 
    border-left: 0; 
}

.history-tl-container ul.tl li::before {
    position: absolute;
    content: " ";
    left: -18px;
    top: -5px;
    border: 8px solid rgba(36, 36, 36, 0.7);
    border-radius: 500%;
    background: gray;
    height: 35px;
    width: 35px;
    transition: all 500ms ease-in;
}

.history-tl-container ul.tl li:hover::before{
    border-color:  gray;
    transition: all 500ms ease-in;
}

ul.tl li .item-detail{
    color: gray;
    font-size:12px;
}

// Tech Stack Right
.tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(6, 1fr);
    gap: 10px;
    height: 70%;
}

.tech-stack-grid-item {
    border: 1px solid gray;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
}
    
.grid-2 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 2;
}

.grid-3 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 4;
}

.grid-4 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 6;
}

.grid-5 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 8;
}

.grid-6 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-row-start: 3;
}

.grid-7 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 3;
    grid-row-start: 3;
}

.grid-8 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 5;
    grid-row-start: 3;
}

.grid-9 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 7;
    grid-row-start: 3;
}

.grid-10 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 9;
    grid-row-start: 3;
}

.grid-11 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 2;
    grid-row-start: 5;
}

.grid-12 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 4;
    grid-row-start: 5;
}

.grid-13 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 6;
    grid-row-start: 5;
}

.grid-14 {
    grid-column: span 2 / span 2;
    grid-row: span 2 / span 2;
    grid-column-start: 8;
    grid-row-start: 5;
}
        
</style>
