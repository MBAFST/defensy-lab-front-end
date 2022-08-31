<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';
    import Card from "../components/Card.svelte";
    
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
</script>

<main>
    <h1>Hi</h1>
</main>

<style>
    main {
        margin-left: 4rem;
    }
</style>
