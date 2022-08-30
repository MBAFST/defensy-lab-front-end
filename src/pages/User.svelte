<script lang="ts">
    import { onMount } from "svelte";
    import axios from "axios";
    import { authenticated } from '../store/auth';

    let message: String;

    onMount(async () => {
        const { data } = await axios.get("user");

        message = `<h3>Hi ${data["first-name"]} ${data["last-name"]}</h3>`;
        authenticated.set(true);
    });
</script>

<div class="container mt-5 text-center">
    {@html message}
</div>
<style></style>