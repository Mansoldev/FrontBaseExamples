## Bucles secuenciales y concurrentes:

### for (Secuencial):

```
for (let index = 0; index < metricQueries.length; index++) {
	const [metricQuery, selector] = metricQueries[index];
	const result = await metricQuery();
	printCustomerMetric(selector, result);
}
```

### for each (En paralelo):

```
metricQueries.forEach(async (metricQuery) => {
	const [query, selector] = metricQuery;
	const result = await query();
	printCustomerMetric(selector, result);
});
```

### Promise.all (Concurrente):

```
Promise.all([searchTotalCustomers(), searchMonthlyRevenue(), searchOpenIncidents()]).then(
	([customers, revenue, incidents]) => {
		printCustomerMetric("customers", customers);
		printCustomerMetric("revenue", revenue);
		printCustomerMetric("incidents", incidents);
	}
);
```
