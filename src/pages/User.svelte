<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';
    import Card from "../components/Card.svelte";
    import AddCard from "../components/AddCard.svelte";
    
    let incidents: any[] = [];
    let docNo = 2;

    onMount(async () => {
        const { data } = await axios.get("incident");
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
    <AddCard/>
    {#each incidents as incident}
        {#if (docNo / 10) === Math.floor(docNo / 10)}
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
