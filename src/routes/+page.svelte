<svelte:head>
    <title>Email</title>
</svelte:head>

<h1 style="text-align: center;">Email</h1>
<h1>이메일을 사용하여, 해당 계정에 정보가 있는지 확인 </h1>
<div >로그인 된 이메일 :     
    <input 
    type="text" 
    placeholder="Enter email"
    bind:value={stateObject.inputText}
    >
    <!-- on:input={(e)=>{stateObject.inputText = e.target.value}} -->

    <button on:click={setStoreValueSvelte}>조회</button>
</div>

<div 
id = "process"
class="progress"
style = {`background-color:${$backColor}`}
>{stateObject.state}</div>

<!-- 상태를 나타내는 문구 -->
<p id = "underText">{stateObject.textUnder}</p>
<p >{`Email : ${stateObject.inputText}`}</p>

<!-- 다음 페이지로 넘어감 -->
<button style={`display:${$linkDisplay}`}><a href = '/datainput'>정보 {search}하기</a></button>

<script>
   import {email,stateText,text,underText,backColor, linkDisplay} from './lib/store.js';
    let search = ''
    let stateObject = {
    state:'',
    inputText:'',
    textUnder:'',
    colorBack:'black',
    display: 'none',
    email: ''
}
    email.subscribe((e)=>{
        console.log(`email to save : ${e}`);
        stateObject.email = email;
    })

    linkDisplay.subscribe((display)=>{
        console.log(`linkDisplay: ${display}`);
        stateObject.display = display;
} )
    linkDisplay.set('none')


    backColor.subscribe((color)=>{
        console.log('backColor : '+ color);
        stateObject.colorBack = color;
    })

    underText.subscribe((underText)=>{
        console.log('underText : '+ underText);
        stateObject.textUnder = underText;
    })

    text.subscribe((text)=>{
        console.log('inputText : '+ text);
        stateObject.inputText = text;
    })

   stateText.subscribe((data)=>{
    console.log('data : '+ data);
        stateObject.state = data;
   });

   // 내용 바꾸기
   async function setStoreValueSvelte() {
    if (stateObject.inputText === "") {
        backColor.set("red");
        stateText.set("email is required");
        underText.set("email is required");
        linkDisplay.set('none')
        console.error("email is required");
        return}
    try {
    // Fetch API를 사용하여 요청 보내기
    linkDisplay.set('none')
    console.log(`text : ${text}`);
    console.log(`stateObject.inputText : ${stateObject.inputText}`);
    
    const response = await fetch(
      `http://127.0.0.1:8000/get-email?email=${stateObject.inputText}`
    );
    console.log(`response : ${response}`);   

    //응답이 정상적으로 완료되면
    if (response.ok) {
        const data = await response.json();
        console.log("data : ", data);
      //   localStorage.setItem("email", inputValue);
      
        stateText.set('fetch is successful');
        underText.set('fetch is successful')
        backColor.set('green')
        email.set(stateObject.inputText)
      // 찾는 데이터가 없을 경우에
        if (data.status === "non-exist") {
            search = '입력'
            // 데이터가 없으면, 입력페이지로 전환 시키기
            linkDisplay.set("block")
            underText.set("정보 입력하기");
            backColor.set("orange");
            stateText.set("No data");
            console.log("Data needed to be added: ", response.status);
        } else {

        // 화면에 데이터 출력
        underText.set(JSON.stringify(data.status));

        // 버튼 색 바뀌기
        search = '수정'
        backColor.set("green");
        stateText.set("done");

        // 데이터가 없으면, 입력페이지로 전환 시키기
        linkDisplay.set("block")
        
      }
    } else {
      // 입력페이지는 보이지 않아아야함.
        linkDisplay.set("none")
    
      // 응답이 정상이 아닐 경우,
      // 버튼 색 바뀌기
        backColor.set("red");
        stateText.set("404");
        underText.set("no such email");

        console.error("no such email ");
    }
  }catch(e){
    linkDisplay.set("none")
    console.log(e)
    stateText.set('connect error');
    underText.set(e)
    backColor.set('red')
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