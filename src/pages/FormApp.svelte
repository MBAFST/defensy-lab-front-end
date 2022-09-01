<script>
	
	import Form from '../components/Form.svelte';
	import ProgressBar from '../components/ProgressBar.svelte';
	let steps = ['Notification', 'Type', 'Notificateur', 'Actions','Evaluation','Follow Up','Rapport'], currentActive = 1, progressBar;
	
	const handleProgress = (stepIncrement) => {
		progressBar.handleProgress(stepIncrement)
	}
	
</script>

<main>
	<div class="container">
		<ProgressBar {steps} bind:currentActive bind:this={progressBar}/>
		
		<Form active_step={steps[currentActive-1]}/>

		<div class="step-button">
			<button class="btn Prev" on:click={() => handleProgress(-1)} disabled={currentActive == 1}>Prev</button>
			<button class="btn Succ" on:click={() => handleProgress(+1)} disabled={currentActive == steps.length}>Next</button>
		</div>		
	</div>	  
</main>

<style>

	@import url('https://fonts.googleapis.com/css?family=Muli&display=swap');
	
	* {
		box-sizing: border-box;
	}
	.container {
		height: 100px;
	}

	main {
		font-family: 'Muli', sans-serif;
		display: flex;
		align-items: center;
		justify-content: center;
		height: 50vh;
	}

	.btn {
		background-color: white;
		color: black;
		border: 1px solid;
		border-radius: 6px;
		cursor: pointer;
		font-family: inherit;
		padding: 8px 30px;
		margin: 5px;
		font-size: 14px;
   
	}
  .Prev{
    transition: border-color 0.5s;
    transition: color 0.5s;
    

  }
  .Prev:hover{
    border-color:  #3498db ;
    color: #3498db;
  }
  .Succ{
    transition: border-color 0.5s;
    transition: color 0.5s;
  }
  .Succ:hover{
    border-color:  #d15073 ;
    color: #d15073;

  }
	.btn:active {
		transform: scale(0.98);
	}

	.btn:focus {
		outline: 0;
	}

	.btn:disabled {
		background-color: #e0e0e0;
		cursor: not-allowed;
	}
	
	.step-button{
		margin-top: 1rem;
		text-align: center;
	}
</style>