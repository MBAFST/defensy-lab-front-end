<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';

    let id: String;
    let name:String;
    let email:String;
    let username:String;

    onMount(async () => {
        const { data } = await axios.get("user");
        id = ` <p>#00${data ["id"]} </p>`;
        email = `${data ["email"]} `;
        name = `<p>${data["first-name"]} ${data["last-name"]}  </p>`;
        username = ` ${data["username"]}`
        authenticated.set(true);
    });
</script>

<main>
    <div class="card"> 
        <span></span>
        <div class="avatar">
            {@html id}
        </div>
        <div class="info">
            <p class="parent">{@html name}</p>
            <p>Username : {@html username } </p>
            <p>E-mail : {@html email}</p>
            <button class="btn">View Rapport</button>
        </div>
    </div>
</main>
    

<style>
    main {
        display: flex;
        justify-content: center;
    }
    span {
    margin-top: 15px;
    border-radius: 8px;
    width: 100px;
    background-color: white;
    height: 20px;
    margin-bottom: 70px;
    }
    .card {
    margin-right: 50px;
background-color: #8e8e8e;
width: 300px;
height: 500px;
display: flex;
align-items: center;
border-radius: 30px;
overflow: hidden;
box-shadow: rgba(0, 0, 0, 0.4) 0px 30px 90px;
}
.avatar {
background-color: #88c0d0;
position: absolute;
color: white;
width: 150px;
height: 150px;
text-align: center;
border-radius: 50%;
margin-top: 70px;
display: flex;
justify-content: center;
align-items: center;
border: 3px white solid;
font-size: 40px;
}
.card .info {
    margin-top: 150px;
background-color: #f4f4f6;
width: 101%;
text-align: center;
border-top-left-radius: 45%;
border-top-right-radius: 45%;
height: 65%;
}
.parent {
margin-top: 50px;
margin-bottom: 1rem;
font-size: 30px;
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