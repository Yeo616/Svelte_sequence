<svelte:head>
    <title>Email</title>
</svelte:head>

<h1 style="text-align: center;">Email</h1>
<h1>이메일을 사용하여, 해당 계정에 정보가 있는지 확인 </h1>
<div >로그인 된 이메일 :     <input type="text" id="inputField" placeholder="Enter email">
    <button id="submitButton">조회</button>
</div>

<div 
id = "process"
class="progress"
>progressing</div>

<p id = "output"></p>

<div id = "turnPage">
    <a id = "link" href="input.html" target="_self">정보 등록하기
    </a>
</div>
<script>
    let rangeValue = 50;
    import {count} from './lib/store.js';
    import {onDestroy} from "svelte";

    const unsubscrube = count.subscribe((v)=>{
        rangeValue =v;
        console.log("변경 감지")
    })

    onDestroy(unsubscrube);
    $:count.set(rangeValue)


</script>
<style>
div.progress {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: black;
    color: white;
    font-size: 16px;
    border: none;
    outline: none;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* cursor: pointer; */
    margin: 10px;
}

#turnPage {
    display: none;
}

</style>