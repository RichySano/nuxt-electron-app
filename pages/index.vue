<template>
    <div v-for="(port) in ports.value">
        <div class="port">
            <span>Friendly name : {{ port.friendlyName }}</span><br>
            <span>Manufacturer : {{ port.manufacturer }}</span><br>
            <span>Path : {{ port.path }}</span><br>
            <span>Pnp Id : {{ port.pnpId }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">

    import { type PortInfo} from '../types/PortInfo';

    const ports = reactive({
        value: {} as PortInfo[]
    })

    //const ports = ref(0);

    onMounted(async() => {
       ports.value = await (window as any).api.listSerialPorts();
    });


</script>

<style scoped>
.port {
    border: 1px solid black
}
</style>