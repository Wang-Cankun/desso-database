[[toc]]
# Background(Biology)


## 1.What is DNA sequence motif?

Gene regulation mechanism is an important biological field, the gene expression is controlled by transcription factors, which is regulatory protein and bind to DNA. Each transcription factor (TF) has a specific binding site (TFBS), and each kind of TFBS also has a unique binding model, named motif.
A DNA motif is a region of DNA that regulates the expression of downstream genes located on that same molecule of DNA, i.e., a chromosome. This concept is equivalent to a DNA cis-regulatory element or cis-element. It contains the transcription factor binding sites (TFBSs) and other conserved functional elements in the 5 intergenic regions of genes.

## 2.What is DNA shape?

DNA shape is the three-dimensional DNA structure.

DNA shape is sequence dependent. however, the degeneracy in the sequence–structure relationship enables the formation of very similar shapes by dissimilar sequences.

Zhou, Tianyin et al. “DNAshape: a method for the high-throughput prediction of DNA structural features on a genomic scale.” Nucleic acids research vol. 41,Web Server issue (2013): W56-62. doi:10.1093/nar/gkt437
DNA is a two stranded molecular in the form of double helix.

DNA shape is described by following features parameters like Minor Groove Width (MGW), Propeller Twist (ProT), Helix Twist (HelT) and Roll.


![Figure0](/docs/figures/background_figure0.png)
Figure 1. Parameters of DNA shape

MGW:
The coiling of the two strands around each other creates two grooves in the double helix: the wider groove is called the major groove, and the smaller the minor groove.

ProT
The propeller twist is a measure of the angle between theplanes of the two bases.
Each base is planar, but when two bases pair, they do not always line up perfectly flat with each other; this angle is called propeller twist because the bases are twisted away from each otherlike an aeroplane propeller. This measure is related to the rigidity of the helix, such that a larger propeller twist angle reflects a more rigid helix

HelT and Roll
The changes in the relative motions of the base pairs at eachstep in the free and the bound helices are described in termsof their local parameters. These parameters,which  include  two  rotations  (roll  and  helix  twist)  and  onetranslation  (slide)  have  been  shown  to  be  most  variable  andsequence-dependent  in  DNA  crystal  structures  and  hencepivotal to DNA deformation and bending.

Rozenberg, H et al. “Structural code for DNA recognition revealed in crystal structures of papillomavirus E2-DNA targets.” Proceedings of the National Academy of Sciences of the United States of America vol. 95,26 (1998): 15194-9. doi:10.1073/pnas.95.26.15194

## 3.What is DNA shape motif?

A DNA shape motif is a significantly over-represented pattern in the profile of a DNA shape feature at regions bound by a DBP(DNA binding protein) as compared to unbound regions.

Shape motif indicates conserved DNA shape patterns that are involved in TF-shape readouts recognition. Shape motifs are conserved in shape level but not necessarily in sequence level.

Samee, Md Abul Hassan et al. “A De Novo Shape Motif Discovery Algorithm Reveals Preferences of Transcription Factors for DNA Shape Beyond Sequence Motifs.” Cell systems vol. 8,1 (2019): 27-42.e6. doi:10.1016/j.cels.2018.12.001

## 4.What is ChIP-seq?
ChIP sequencing (ChIP-Seq) is a powerful method for identifying genome-wide DNA binding sites for transcription factors and other proteins. Following ChIP protocols, DNA-bound protein is immunoprecipitated using a specific antibody. The bound DNA is then coprecipitated, purified, and sequenced.

ChIP-Seq identifies the binding sites of DNA-associated proteins and can be used to map global binding sites for a given protein.

# Background (Deep learning)

## 5.What is deep learning?

Deep Learning is a subfield of machine learning concerned with algorithms inspired by the structure and function of the brain called artificial neural networks. Its algorithms uses multiple layers to progressively extract higher level features from the raw input.
Deep learning architectures such as DNN(deep neural networks), DBN(deep belief networks), RNN(recurrent neural networks) and CNN(convolutional neural networks) have been applied to fields including computer vision, speech recognition, natural language processing, audio recognition

## What is DNN(deep neuron network)?

## what is CNN(convolutional neural network)?

# Background information

Short description about the primary functions of the server, including peaks classification, motif finding and motif analyses.

# 6.What is DESSO?

One of the most fundamental questions in biology is how to understand the transcription factor binding and regulated mechanism. Larger-scale chip-seq sequencing and biology experiment studies are now rapidly opening up new ways to track this question by this binding mode from transcription faactor. Here, we developed the DESSO databases, aiming to provide a service for users to find and analysis motifs from their data.

# 7.Overview of the DESSO database

By manually curating several the state-of-art models, which is used to find motifs. we collected 185 transcription factors related to 20 cancer types, to evaluate deep learning models. In the light of the experimental results, DESSO model obtained the best result on finding motifs, Basset model obtained the best performance on peaks classification. Based on the published paper, the DESSO model also obtained the best performance on 690 chips-seq datas. In this server, we installed these two model to performan two kinds of tasks, and we also published the found motifs of the DESSO, the trained model for each transcription factor. regarding to the Basset mode, we also deployed the trained model for peaks classification, because of its best perfomance. Meanwhile, the single-cell chip-seq experiment is a challenge for people, because of the limitted technology. We collect the single-cell chips-seq data to finding motifs by using deep learning models.

> **Our server has a number of novel capabilities:**  
> (i) find TFs are related to cancer types  
> (ii) identifying the binding sites  
> (iii) finding DNA motifs from chip-seq peaks  
> (iv) match denovo motifs to the existed motifs  
> (v) motif scanning  
> (vi) annotation genes to TFs binding sites
> (vii) finding motifs from the single-cell schip-seq dataset

> **8.Why choose DESSO?**  
> ![Figure1](/docs/figures/background_DESSOcompare.png)
> ![Figure2](/docs/figures/background_DESSOcompare2.png)
Figure1 DESSO copmared with other tools
Figure2 DESSO copmared with other tools
> **How does DESSO find motifs?**
>The DESSO framework is composed of (i) a CNN model for extracting motif patterns from given ChIP-seq peaks, and (ii) a statistical model based on the binomial distri- bution for optimizing the identification of motif instances
>The first layer of the CNN model contains multiple con- volutional filters, which were used to iden- tify low-level features from given ChIP-seq peaks. A sub- sequent max pooling layer and a fully connected layer were used to extract high-level features based on the output from the convolutional layer.
>The binomial-based model in DESSO to identify all the significant TFBSs under the statistical hypothesis that the number of random sequence segments that contain the motif of interest in the human genome is binomially distributed.



# 9.What can this server do in motif analyses.


# 10.What is a position weight matrix (PWM)?
A position weight matrix (PWM), also known as a position-specific weight matrix (PSWM), is a commonly used representation of motifs (patterns) in biological sequences. In a position weight matrix, each row corresponds to one symbol of the alphabet, e.g., amino acids or nucleic acids, and each column corresponds to one position in the pattern. 

APWMs are often derived from a set of aligned sequences that are thought to be functionally related.
A PWM has one row for each symbol of the alphabet: 4 rows for nucleotides in DNA sequences. It also has one column for each position in the pattern. A basic PWM using relative frequencies is constructed by counting the occurrences of each symbol at each position and then normalizing at each position. Formally, given a set X of N aligned sequences of length l, the elements of the PWM M are calculated:
> ![Figure4](/docs/figures/background_PMW.png)
where i = 1,...,N, j = 1,...,l, k is the set of symbols in the alphabet and I(x) is an indicator function.

Zhang X. (2013) Position Weight Matrices. In: Dubitzky W., Wolkenhauer O., Cho KH., Yokota H. (eds) Encyclopedia of Systems Biology. Springer, New York, NY

https://davetang.org/muse/2013/10/01/position-weight-matrix/

# 11.What is motif scanning?

Motif scanning is discovering novel motifs in collections of unaligned nucleotide or protein sequences.

Motif scanning is used to infer a network of associations between transcription factor genes and clusters of co-expressed target genes.

# 12.How did you select deep learning program for motif finding?

Before developing this server, we applied the main top deep learning model to find motif on the 185 chip-seq datasets. In our experiments, we evaluate the performance of all deep learning models from two aspects including find motifs and peaks classification. About the first aspect we compare all deep learning models' performance by computing the P-value, E-value, and Q-value of motifs. with regarding to the second one, we select eight criterions to evaluate the capacities that identify the peaks is TFs binding site or not, finally we summary eight criterions as the area of octagon.  
Accoding to the area of each deep learning model shown as figure1, the Basset model obtainded the best performance about peaks classification and the DESSO model obtainded the best performance about finding motifs.
![Figure1](/docs/figures/background_figure1.png)
Figure 2. A characterization of the 20 methods evaluated in this study and their overall evaluation results

# 13.What kinds of formats of input sequences are suitable for this server to find motifs.

Currently we accept three kinds of motif formats, shown as follows,  
(i) bed file

(ii) fasta file

(iii) sequences

# 14.What kinds of formats of motifs can be used to analysis.

Currently we accept three kinds of motif formats, shown as follows,  
(i)bed file

(ii) meme

(iii) fasta

(vi) pwm

# 15. How to cite us?

[1]Jinyu Yang, Anjun Ma, Adam D Hoppe, Cankun Wang, Yang Li, Chi Zhang, Yan Wang, Bingqiang Liu, Qin Ma, Prediction of regulatory motifs from human Chip-sequencing data using a deep learning framework, Nucleic Acids Research, Volume 47, Issue 15, 05 September 2019, Pages 7809–7824, https://doi.org/10.1093/nar/gkz672

[2]

---

---
