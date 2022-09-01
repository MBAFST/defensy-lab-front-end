<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';
    import Card from "../components/Card.svelte";
    import { link, push } from "svelte-spa-router";
    
    let incidents: any[] = [];
    let docNo = 1;

    onMount(async () => {
        const { data } = await axios.get("incident");
        const documents = data["documents"];
        for (let item of documents) {
            incidents = [...incidents, item];
        }
        authenticated.set(true);
    });

    $: back = async () => {
        await push("/user/id");
    }
    let date = new Date().toLocaleDateString();
    let incident:Object = {
        
    }
</script>

<main>

    <h1>Hi `${date}`</h1>


    <a href="/user/id" use:link><button class="btn">Back</button></a>
</main>

<style>
    main {
        margin-left: 4rem;
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
