<template>
    <div class="layout">
        <h1 class="center mb-2">
            Deploy a Nuxt.js Application on a N0C Server
        </h1>

        <div class="logo-container">
            <img src="/img/noc-logo.svg" alt="N0C Logo" width="500" />
        </div>
    </div>
    
</template>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
    
    body {
        font-family: 'Lato', sans-serif;
        margin: 0;
        padding: 0;
        color: #4B4F54;
    }

    .layout {
        /** Center vertically */
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }

    .mb-2 {
        margin-bottom: 2rem;
    }

    .center {
        text-align: center;
    }

    .logo-container {
        display: flex;
        justify-content: center;
        max-width: 50%;
        margin: 0 auto;
    }
</style>