<script >
    import ToDoItem from '../components/ToDoItem.svelte';
    export let item, inputRedact;
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    export let showInput;

    const del = () => {
        dispatch('del');
    }

    const redact = () => {
        showInput = true;
    }

    const todoRedact = (e) => {
        e.preventDefault();
        item.title = inputRedact;
        showInput = false;
    }

</script>

<style>
    .wrap-item {
    	border: 2px solid royalblue;
    	-webkit-border-radius: 5px;
    	-moz-border-radius: 5px;
    	border-radius: 5px;
    	width: 300px;
    	min-height: 200px;
    	height: auto;
    	position: relative;
    	padding: 20px 100px 20px 20px;
    	margin-bottom: 20px;
    }

    .wrap-data {
    	position: absolute;
    	right: 6px;
    	bottom: 3px;
    }

    .delete {
        background-color: red;
        width: 30px;
        height: 30px;
        -webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;
        overflow: hidden;
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }

    .wrap-delete {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .wrap-delete span {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 20px;
        height: 2px;
        background-color: #ffffff;
    }

    .wrap-delete span:nth-child(1) {
        -webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);
    }

    .wrap-delete span:nth-child(2) {
        -webkit-transform: rotate(-45deg);-moz-transform: rotate(-45deg);-ms-transform: rotate(-45deg);-o-transform: rotate(-45deg);transform: rotate(-45deg);
    }

    .redact {
        cursor: pointer;
        width: 30px;
        height: 30px;
        background-color: green;
        color: #ffffff;
        position: absolute;
        right: 70px;
        top: 10px;
        -webkit-border-radius: 100%;-moz-border-radius: 100%;border-radius: 100%;
        text-align: center;
        line-height: 30px;
    }

</style>

<li>
    <div class="wrap-item">

        {#if showInput}
            <form action="" method="" on:submit={todoRedact} class="form-two">
                <input type="text" placeholder="Название" bind:value={inputRedact}>
            </form>
        {/if}

        <div class="title">{item.title}</div>
        <div class="wrap-data">{item.dateCreate}</div>
        <div class="delete"><div class="wrap-delete" on:click={del}><span></span><span></span></div></div>
        <div class="redact" on:click={redact}>R</div>
    </div>
</li>