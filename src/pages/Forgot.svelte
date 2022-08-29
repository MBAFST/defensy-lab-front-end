<script lang="ts">
    import axios from "axios";

    let email: String = "";
    let cls: String = "";
    let message: String = "";

    $: submit = async () => {
        const {status } = await axios.post("forgot", {email});

        if (status === 200) {
            cls = "success";
            message = "Email was send!";
        }
        else {
            cls = "danger";
            message = "Email does not exist!";
        }
    }
</script>

<main class="form-signin w-100 m-auto">
    {#if cls}
        <div class={`alert alert-${cls}`} role="alert">
            { message }
        </div>
    {/if}

	<form on:submit|preventDefault="{submit}">
		<h1 class="h3 mb-3 fw-normal">Please sign in</h1>

		<div class="form-floating">
			<input bind:value="{email}" type="email" class="form-control" placeholder="name@example.com">
			<label>Email address</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
	</form>
</main>
