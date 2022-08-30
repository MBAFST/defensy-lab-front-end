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
		<h1 class="h3 mb-3 fw-normal">Enter Your Email Recovery  </h1>

		<div class="form-floating">
			<input bind:value="{email}" type="email" class="form-control" placeholder="name@example.com">
			<!-- svelte-ignore a11y-label-has-associated-control -->
			<label>Email address</label>
		</div>

		<button class="w-100 btn btn-lg btn-primary mt-3" type="submit">Sign in</button>
	</form>
</main>
<style>
    .form-floating .form-control{
		margin-bottom: 20px;
		width: 400px;
		border: 0;
		border-bottom: 1px solid #212529;
		border-radius: 0;
	}
	.btn {
		margin-top: 10px;
		background-color: transparent;
		color:#132a6a;
		border-color: #ef5f55;
	}
    h1 {
        width: 400px;
        color: #132a6a;
    }
</style>
