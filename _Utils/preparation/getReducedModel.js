'use strict';

var PCA = require('ml-pca');
var ubique = require('ubique');

/*

This function perfoms a PCA along with a model reduction

*/



module.exports = function(matrix, k){

	// normalization is done directly by ml-pca
	var pca = new PCA(matrix);

	var eigenvectors = pca.getEigenvectors();
	var reducedEigenvectors = ubique.linspace(0, k - 1, k).map(function(i){
		return eigenvectors[i];
	});

	var explainedVariance = pca.getExplainedVariance();
	var reducedExplainedVariance = ubique.sum(explainedVariance.slice(0, k));

	console.log('explainedVariance', explainedVariance);

	return {
		eigenvectors: reducedEigenvectors,
		explainedVariance: reducedExplainedVariance,
		projection: pca.project(matrix, k)
	};
};
