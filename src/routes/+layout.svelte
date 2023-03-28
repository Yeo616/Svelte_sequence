<nav>
    <ul>
        <li><a href = "/">메인 페이지</a></li>
        <li><a href = "/datainput">데이터 입력</a></li>
    </ul>
</nav>

<slot />

<style>
    ul {
        display: flex;
        list-style:none;
    }
    li {
        margin-right:10px;
    }
</style>