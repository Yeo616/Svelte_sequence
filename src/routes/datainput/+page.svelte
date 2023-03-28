<!-- App.svelte -->
<script>
    import { onMount } from 'svelte';
    
    let inputValue = '';
    let outputText = '';
    let progressCircleText = '';
    let progressCircleColor = '';
    let turnPageStyle = '';
    let pageLinkText = '';
    
    const loadData = async () => {
      if (inputValue === '') {
        progressCircleColor = 'red';
        progressCircleText = 'email is required';
        outputText = 'email is required';
        console.error('email is required');
        return;
      }
  
      try {
        const response = await fetch(`http://127.0.0.1:8000/get-email?email=${inputValue}`);
  
        if (response.ok) {
          const data = await response.json();
  
          if (data.status === 'non-exist') {
            turnPageStyle = 'display: block;';
            pageLinkText = '정보 입력하기';
            progressCircleColor = 'orange';
            progressCircleText = 'No data';
            outputText = 'No data';
            console.error('Network response was not ok: ', response.status);
          } else {
            outputText = JSON.stringify(data.status);
            progressCircleColor = 'green';
            progressCircleText = 'done';
            turnPageStyle = 'display: block;';
            pageLinkText = '정보 수정하기';
          }
        } else {
          turnPageStyle = 'display: none;';
          progressCircleColor = 'red';
          progressCircleText = '404';
          outputText = 'no such email';
          console.error('no such email');
        }
      } catch (error) {
        turnPageStyle = 'display: none;';
        progressCircleColor = 'red';
        progressCircleText = 'connect error';
        outputText = error;
        console.error('catch error: ', error);
      }
    };
  
    const handleInputChange = (event) => {
      inputValue = event.target.value;
      localStorage.setItem('email', inputValue);
    };
  
    onMount(() => {
      const email = localStorage.getItem('email');
  
      if (email) {
        inputValue = email;
      }
    });
  </script>
  
  <main>
    <button on:click={loadData}>포스트 리스트 가져오기</button>
    <div id="process" style={`background-color: ${progressCircleColor}`}>{progressCircleText}</div>
    <input type="text" id="inputField" on:input={handleInputChange} bind:value={inputValue}>
    <div id="output">{outputText}</div>
    <div id="turnPage" style={turnPageStyle}>
      <a id="link">{pageLinkText}</a>
    </div>
  </main>
  
  <style>
    main {
      text-align: center;
      padding: 1em;
      max-width: 240px;
      margin: 0 auto;
    }
  
    @media (min-width: 640px) {
      main {
        max-width: none;
      }
    }
    </style>
  