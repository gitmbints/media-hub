<template>
  <div>
    <h1 class="font-semibold text-3xl text-center mb-5">Thanks for registering!</h1>
    <p>
      Please confirm your email to finishing registering:
      {{ $route.query.email }}
    </p>
  </div>
</template>