<script >
    import ToDoItem from '../components/ToDoItem.svelte';
    let input,
        list,
        item,
        dateCreate,
        showInput = false;

    export let arrItems = [];

    const todoList = (e) => {
        e.preventDefault();
        item = input.value;
        dateCreate = new Date();
        console.log(item);
        input.value = '';

        arrItems.push(
            {
                title: item,
                dateCreate: dateCreate.getDate() + '.' + (dateCreate.getMonth() + 1) + '.' + dateCreate.getFullYear() + 'г.'
            }
        )
        console.log(arrItems);
    }

    const delHandle = (i) => arrItems = arrItems.filter((item, index) => index !== i);
</script>

<form action="" method="" on:submit={todoList} class="first-form">
    <input class="first-input" type="text" placeholder="Название" bind:this={input}>
</form>

<ol bind:this={list}>
    {#each arrItems as item, i(item.title)}
        <ToDoItem {item} on:del={() => delHandle(i)}></ToDoItem>
    {/each}
</ol>