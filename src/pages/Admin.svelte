<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';
    import Card from "../components/Card.svelte";

    let incidents: any[] = [];
    let docNo = 1;

    onMount(async () => {
        const data  = await axios.get("admin");
        const documents = data["documents"];
        for (let item of documents) {
            incidents = [...incidents, item];
        }
        authenticated.set(true);
    });

    function increment(): number {
        return docNo++;
    }
</script>

<main>
    {#each incidents as incident}
        {#if (docNo / 5) === Math.floor(docNo / 5)}
            <br>
        {/if}
        <Card docNo={increment()} {incident}/>
    {/each}
</main>

<style>
    main {
        margin-left: 4rem;
    }
</style>
