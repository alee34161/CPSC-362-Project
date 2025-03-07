import React, { useEffect, useState } from 'react';

function Congratulations() {
	return (
		<h1>Good job, test is working as inteded</h1>
	)
}

export default function Test() {
	return(
		<section>
			<Congratulations />
		</section>
	)
}
