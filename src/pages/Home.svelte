<script lang="ts">
    import { onMount } from "svelte";
    import { authenticated } from '../store/auth';

    let message: String;

    onMount(async () => {
        message = "You are not logged in";
        authenticated.set(false);
    });
</script>

<div class="container mt-5 text-center">
    {@html message}
</div>
