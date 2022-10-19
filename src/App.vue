<script>
</script>

<template>

  <main>
    <table class="styled-table">
    <thead>
        <tr>
            <th>
              Carpark Categories
            </th>
            <th>Highest available lots</th>
            <th>Lowest available lots</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Small</td>
            <td>60</td>
            <td>44</td>
        </tr>
        <tr class="active-row">
            <td>Medium</td>
            <td>5150</td>
            <td>222</td>
        </tr>
        <tr class="active-row">
            <td>Big</td>
            <td>5150</td>
            <td>222</td>
        </tr>
        <tr class="active-row">
            <td>Large</td>
            <td>5150</td>
            <td>222</td>
        </tr>
    </tbody>
</table>
  </main>
</template>

<style scoped>

.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

.styled-table {
    border-collapse: collapse;
    margin: 25px 0;
    font-size: 0.9em;
    font-family: sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.styled-table thead tr {
    background-color: #009879;
    color: #ffffff;
    text-align: left;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
