<script lang="ts">
    export let incident: any;
    export let docNo: number;
</script>

<div class="card">
    <div class="inner-card">
        <span></span>
        <div class="avatar">
            <p>#{docNo} </p>
        </div>
        <div class="info">
            <p class="parent">{incident["first-name"]} {incident["last-name"]}</p>
            <p>Username : {incident["username"]} </p>
            <p>E-mail : {incident["email"]}</p>
            <button class="btn">View Rapport</button>
        </div>    
    </div>
</div>
    

<style>
    span {
        margin-top: 0;
        height: 1.25rem;
        margin-bottom: 0;
    }
    
    .card {
        margin: 1.5rem 1.5rem 1.5rem 1.5rem;
        background-color: #8e8e8e;
        width: 18rem;
        height: 30rem;
        display: inline-block;
        border-radius: 1.75rem;
        overflow: hidden;
        box-shadow: rgba(0, 0, 0, 0.4) 0px 1.75rem 6rem;
    }

    .inner-card {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
    }
    
    .avatar {
        top: 4rem;
        background-color: #88c0d0;
        position: absolute;
        color: white;
        width: 10rem;
        height: 10rem;
        text-align: center;
        border-radius: 50%;
        padding-top: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 0.2rem white solid;
        font-size: 3rem;
    }
    
    .card .info {
        margin-top: 10rem;
        background-color: #f4f4f6;
        width: 105%;
        text-align: center;
        border-top-left-radius: 45%;
        border-top-right-radius: 45%;
        height: 70%;
    }
    
    .parent {
        margin-right: 1rem;
        margin-left: 1rem;
        margin-top: 3.5rem;
        margin-bottom: 1rem;
        font-size: 2rem;
        text-transform: uppercase;
        color: #4c566a;
    }
    
    .btn {
        background-color: transparent;
        color:#132a6a;
        border-color: #ef5f55;
    }

    .btn:hover{
        background-color: #ef5f55;
        color:white;
        border-color: #132a6a;
    }
</style>
