-- Criar banco de dados
CREATE DATABASE IF NOT EXISTS gerenciador_tccs;
USE gerenciador_tccs;

-- Criar tabela TCCs
CREATE TABLE IF NOT EXISTS tccs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    autor VARCHAR(100) NOT NULL,
    titulo VARCHAR(255) NOT NULL UNIQUE, -- Adicione UNIQUE para evitar duplicados
    resumo TEXT NOT NULL,
    arquivo_pdf VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir TCCs de exemplo (evitando duplicação)
INSERT INTO tccs (autor, titulo, resumo, arquivo_pdf) VALUES
('Claudionei Lovato Serafini', 'Aprimorando a Detecção de Anomalias em Sistemas Agrícolas Inteligentes.',
 'A agricultura desempenha um papel crucial no desenvolvimento sustentável e econômico global, impulsionada significativamente pelos avanços tecnológicos recentes como a Internet das Coisas (IoT) e a agricultura de precisão. Estas inovações têm transformado práticas agrícolas, permitindo uma gestão mais eficiente dos recursos e uma produção mais sustentável. Dentro deste contexto, o CEIFA, um sistema híbrido de detecção de anomalias de baixo custo, foi desenvolvido para melhorar a detecção de anomalias em sistemas agrícolas inteligentes. Apesar de alcançar mais de 98% de precisão, o CEIFA prioriza a detecção de dados anômalos, o que faz com que toda massa de dados normais passe por todos os detectores, resultando em alta latência e um consumo excessivo de recursos computacionais. O presente trabalho propõe uma nova abordagem para o CEIFA, invertendo a lógica tradicional de detecção. A nova estratégia prioriza a filtragem de dados normais, permitindo a liberação premilinar de dados normais, que representavam grande parte do volume de dados. Com essa implementação o CEIFA consegue reduzir significativamente sua carga computacional. Os resultados indicam que, ao aplicar métodos como o Intervalo Interquartil (IQR) ou Z-Score modificado, é possível reduzir mais de 60% do volume de dados processados nas primeiras etapas, otimizando o uso de memória e o tempo de execução, especialmente nos módulos de análise de borda. Com isso, o sistema se mostra mais eficiente e acessível para diferentes contextos agrícolas, alinhando-se com os esforços globais para promover a inovação tecnológica e a sustentabilidade no setor agrícola.',
 '/uploads/tcc1.pdf')
ON DUPLICATE KEY UPDATE autor = VALUES(autor);

INSERT INTO tccs (autor, titulo, resumo, arquivo_pdf) VALUES
('Angelita Rettore De Araujo Zanella', 'Detector Híbrido de Anomalias para Agricultura Inteligente.',
 'As mudanças climáticas, a crise da água e o crescimento populacional acrescentam novos desafios para a produção de alimentos. O aumento das taxas de produção e a preservação de recursos naturais dependem da modernização dos métodos agrícolas. A agricultura inteligente fornece recursos capazes de melhorar a atividade agrícola por meio do controle eficiente de atuadores, otimizando o consumo de recursos e o gerenciamento da produção, otimizando seus resultados. Para que estas tecnologias se tornem populares, elas devem ter um alto nível de confiabilidade e segurança, o que não é observado nos sistemas desenvolvidos até o momento. Para melhorar a confiabilidade na Agricultura Inteligente, este documento propõe o CEIFA, um detector de anomalias híbrido de baixo custo capaz de identificar falhas, erros e ataques que afetam estes sistemas. Diferentemente dos detectores já desenvolvidos, que têm seu escopo limitado à detecção de intrusões, o sistema proposto tem como alvo anomalias decorrentes de falhas e erros que acometem os dispositivos de coletas de dados e os ataques dentro do escopo do ciberagroterrorismo, podendo detectar outros ataques que causem alterações nos dados. O CEIFA utiliza uma arquitetura híbrida, combinando operação na borda e na nuvem. Sua arquitetura modular permite que o sistema seja ajustado às necessidades e contextos do sistema agrícola, que pode utilizar dispositivos com recursos computacionais limitados, servidores locais ou na nuvem. A detecção é feita analisando os dados enviados pelos sensores do sistema agrícola. A identificação de anomalias é feita por meio de análise estatística, correlação de dados e aprendizagem de máquina. A análise estatística incorpora avaliação de tendências e dispersão de dados, em um modelo matemático capaz de identificar falhas e erros de forma eficiente e com baixo custo computacional. Para maximizar a precisão e possibilitar a detecção de intrusões, foram incluídas a correlação de dados e a aprendizagem de máquina. A construção do sistema utilizou como base uma rede composta por cinco transdutores, equipados com sensores que coletaram dados climáticos e ambientais. Os transdutores foram instalados em ambiente agrícola em campo aberto, expostos aos eventos climáticos e ambientais, bem como à ação de animais e humanos. Os sensores foram alvos de falhas e erros que permitiram mapear os padrões de dados. Ao final da coleta de dados, não havia dispositivos íntegros em quantidade suficiente para serem utilizados nas fases seguintes. Para validar o sistema, foi utilizado um protótipo, composto por 19 sensores virtuais, um dispositivo de borda e um servidor na nuvem. Os resultados mostram que o detector utiliza pouca memória, apresentando baixos níveis de processamento e ocupação de espaço em disco. Na borda os dados demoraram 355ms para serem processados, utilizando 111MB de memória (considerando todas as operações de leitura e escrita) e 262KB de espaço em disco. Na nuvem, os dados são processados em 4ms, consumindo 120MB de memória e ocupando 2MB de espaço em disco. Quanto à acurácia, o detector superou 95% de acertos na detecção de anomalias. A borda identificou 80% das anomalias alvo e a nuvem 93%. O CEIFA é, portanto, uma alternativa confiável, eficiente e de baixo custo, capaz de economizar recursos com alta eficiência e acurácia reduzida.',
 '/uploads/tcc2.pdf')
ON DUPLICATE KEY UPDATE autor = VALUES(autor);

INSERT INTO tccs (autor, titulo, resumo, arquivo_pdf) VALUES
('Ryan Karling', 'Estratégias de Visualização para Dados Coletados de Sistemas Agrícolas Inteligentes.',
 'A agricultura inteligente representa um avanço significativo na produção agrícola, integrando dispositivos de Internet das Coisas e sistemas de análise de dados para monitorar e otimizar o manejo das culturas. Esse cenário traz consigo a necessidade de sistemas robustos que garantam a integridade e a segurança dos dados coletados. O CEIFA foi projetado para monitorar anomalias no ambiente agrícola e surge como uma solução promissora, permitindo que produtores identifiquem problemas em tempo real. No entanto, a ausência de uma interface gráfica limita seu uso para monitoramento direto, gerando a necessidade de uma plataforma que permita a visualização dos dados de forma intuitiva e fácil. Buscando superar esta limitação, este trabalho avalia plataformas de software como serviço gratuitas e de código aberto que possam ser utilizadas para visualização de dados. A avaliação tem como objetivo determinar a mais adequada para integração ao CEIFA em dispositivos de borda e na nuvem. Para isso foram realizados testes em diferentes cenários com variados números de sensores e acessos simultâneos, visando simular tanto pequenos quanto médios ambientes agrícolas. As plataformas Metabase e Grafana apresentam-se mais adequadas dentre as opções testadas, enquanto outras soluções apresentam limitações técnicas ou alto custo operacional. O Metabase destaca-se por sua interface completa, adequada para análises detalhadas, embora exija maior capacidade computacional, o que o torna ideal para uso em servidores na nuvem. Por outro lado, o Grafana, com menor consumo de recursos e eficiência em dispositivos com restrições, mostra-se a melhor opção para o ambiente de borda.',
 '/uploads/tcc3.pdf')
ON DUPLICATE KEY UPDATE autor = VALUES(autor);

-- Banco de Dados para Usuários
CREATE DATABASE IF NOT EXISTS register;
USE register;

-- Tabela de Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);