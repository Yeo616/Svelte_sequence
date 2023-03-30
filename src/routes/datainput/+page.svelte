<svelte:head>
    <title>Input</title>
</svelte:head>

<h1 style="text-align: center;">정보 입력 페이지</h1>
<div >로그인 된 이메일 : {savedEmail} </div>
<div >
    <p><b>데이터 입력 : </b> </p>

    <input 
    type="text" 
    placeholder="Enter data"
    bind:value={dataObject.inputText}
    >
    <!-- on:input={(e)=>{stateObject.inputText = e.target.value}} -->

    <button on:click={addData}>추가</button>
</div>

<div 
id = "process"
class="progress"
style = {`background-color:${$dataBackColor}`}
>{dataObject.state}</div>

<!-- 상태를 나타내는 문구 -->
<p id = "underText">{dataObject.textUnder}</p>

<!-- 데이터 삭제 -->
<button
    on:click={deleteData}
    style={`display:${$dataLinkDisplay}`}>데이터 삭제 하기</button>

<a href='/' > 메인페이지로 이동</a>

<script>
   import {email,dataBackColor,dataLinkDisplay,dataState,dataText, dataUnderText} from '../lib/store.js';
   let savedEmail = '' 
    email.subscribe((e)=>{
        savedEmail = e
    });

    let dataObject = {
        state:'',
        inputText:'',
        textUnder:'',
        colorBack:'black',
        display: 'none'
    }
    dataLinkDisplay.subscribe((display)=>{
        console.log(`dataLinkDisplay: ${display}`);
        dataObject.display = display;
} )
    dataBackColor.subscribe((color)=>{
        console.log('dataBackColor : '+ color);
        dataObject.colorBack = color;
    })

    dataUnderText.subscribe((underText)=>{
        console.log('dataUnderText : '+ underText);
        dataObject.textUnder = underText;
    })

    dataText.subscribe((text)=>{
        console.log('inputText : '+ text);
        dataObject.inputText = text;
    })

    dataState.subscribe((data)=>{
    console.log('dataState : '+ data);
    dataObject.state = data;
   });

   // 삭제
   async function deleteData(){
    // Fetch API를 사용하여 요청 보내기
    const response = await fetch(`http://127.0.0.1:8000/delete-info?email=${savedEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({"email":savedEmail}),
    });
    const data = await response.json();

    if(response.ok){
        dataUnderText.set(JSON.stringify(data.status));
        dataBackColor.set("green");
        dataState.set("delete successfully");
        console.error("delete successfully");
        dataLinkDisplay.set('none')
    }else{
        dataUnderText.set(JSON.stringify(data.status));
        dataBackColor.set("red");
        dataState.set("connect error");
        console.error("connect error");
    }
}

   // 내용 바꾸기
   async function addData() {
    if (dataObject.inputText === "") {
        dataBackColor.set("red");
        dataState.set("info is required");
        dataUnderText.set("info is required");
        console.error("info is required");
        dataLinkDisplay.set('none')
        return
    }

    try {
    // Fetch API를 사용하여 요청 보내기
    console.log(`datatext : ${dataText}`);
    console.log(`stateObject.inputText : ${dataObject.inputText}`);
    
    const response = await fetch(`http://127.0.0.1:8000/post-info-body`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: savedEmail, info: dataObject.inputText }),
          });
    console.log(`response : ${response}`);   
    const data = await response.json();

    //응답이 정상적으로 완료되면
    if (response.ok) {
        dataUnderText.set("new_info : "+ dataObject.inputText);
        dataState.set('success');
        dataBackColor.set('green')
        console.log("data : ", data.status);
        dataLinkDisplay.set("block")

        } else {

        // 화면에 데이터 출력
        dataUnderText.set('invaild email');
        dataBackColor.set("red");
        dataState.set("404");
        dataLinkDisplay.set("none")
      }
  }catch(e){
    dataLinkDisplay.set("none")
    console.log(e)
    dataState.set('connect error');
    dataUnderText.set(e)
    dataBackColor.set('red')
  }
    
}

// async function loadData(event) {
//   // 폼 제출에 의한 페이지 새로고침 방지
//   event.preventDefault();

//   localStorage.setItem("email", inputValue);

</script>



<style>
div.progress {
    display: inline-block;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    color: white;
    background-color: black;
    font-size: 16px;
    border: none;
    outline: none;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
}


</style>