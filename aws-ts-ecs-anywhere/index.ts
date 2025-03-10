// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";
import { ec2 } from "@pulumi/aws/types/enums"; 
import { LoadBalancer } from "@pulumi/aws/alb";

// Get config
// const awsConfig = new pulumi.Config("aws");
// const awsRegion = awsConfig.get("region");

//const projectConfig = new pulumi.Config();
// const numberNodes = projectConfig.getNumber("numberNodes") || 2;

//Set IAM roles
// const ssmRole = new aws.iam.Role("ssmRole", {
//   assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(
//     aws.iam.Principals.SsmPrincipal,
//   ),
// });

// const ssmCoreRoleAttachment = new aws.iam.RolePolicyAttachment("rpa-ssmrole-ssminstancecore", {
//   policyArn: aws.iam.ManagedPolicy.AmazonSSMManagedInstanceCore,
//   role: ssmRole,
// });

// const ssmRoleEc2ContainerAttachment = new aws.iam.RolePolicyAttachment("rpa-ssmrole-ec2containerservice", {
//   policyArn: aws.iam.ManagedPolicy.AmazonEC2ContainerServiceforEC2Role,
//   role: ssmRole,
// });

// const executionRole = new aws.iam.Role("taskExecutionRole", {
//   assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(
//     aws.iam.Principals.EcsTasksPrincipal,
//   ),
// });
// // "arn:aws:iam::872232775305:role/ecsTaskExecutionRole"
// // const ecsTaskExecutionRoleAttachment = new aws.iam.RolePolicyAttachment("rpa-ecsanywhere-ecstaskexecution", {
// //   role: executionRole,
// //   policyArn: "arn:aws:iam::872232775305:role/ecsTaskExecutionRole",
// // });

// const taskRole = new aws.iam.Role("taskRole", {
//   assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal(
//     aws.iam.Principals.EcsTasksPrincipal,
//   ),
// });
const cluster = new awsx.ecs.Cluster("cluster");
const lb = new awsx.elasticloadbalancingv2.ApplicationLoadBalancer("net-lb",{
  external: true,
  securityGroups:cluster.securityGroups
})
const web = lb.createListener("web",{
  port:80,
  external:true
})
const img = awsx.ecs.Image.fromPath("app-img","./app")
const appServer = new awsx.ecs.FargateService("app-srv",{
  cluster:cluster,
  taskDefinitionArgs:{
    container:{
      image:img,
      cpu:128,
      memory:50,
      portMappings:[web]
    }
  },
  desiredCount:1,
})
export const url = web.endpoint.hostname
// const taskRolePolicy = new aws.iam.RolePolicy("taskRolePolicy", {
//   role: taskRole.id,
//   policy: {
//     Version: "2012-10-17",
//     Statement: [
//       {
//         Effect: "Allow",
//         Action: [
//           "ssmmessages:CreateControlChannel",
//           "ssmmessages:CreateDataChannel",
//           "ssmmessages:OpenControlChannel",
//           "ssmmessages:OpenDataChannel",
//         ],
//         Resource: "*",
//       },
//       {
//         Effect: "Allow",
//         Action: ["logs:DescribeLogGroups"],
//         Resource: "*",
//       },
//       {
//         Effect: "Allow",
//         Action: [
//           "logs:CreateLogStream",
//           "logs:CreateLogGroup",
//           "logs:DescribeLogStreams",
//           "logs:PutLogEvents",
//         ],
//         Resource: "*",
//       },
//     ],
//   },
// });

// Set up SSM
// const ssmActivation = new aws.ssm.Activation("ecsanywhere-ssmactivation", {
//   iamRole: ssmRole.name,
//   registrationLimit: numberNodes,
// });

// Create cluster and export cluster name
//const cluster = new aws.ecs.Cluster("cluster");

// const vpc = new awsx.ec2.Vpc("vpc", {});
// const securityGroup = new aws.ec2.SecurityGroup("securityGroup", {
//     vpcId: vpc.id,
//     egress: [{
//         fromPort: 0,
//         toPort: 0,
//         protocol: "-1",
//         cidrBlocks: ["0.0.0.0/0"],
//         ipv6CidrBlocks: ["::/0"],
//     }],
// });

// const vpc = new awsx.ec2.Vpc("vpc", {
  
  
// });
// const myCluster = new aws.ecs.Cluster("my-cluster");
// const aws_ecs_task_definition = new aws.ecs.TaskDefinition("hello_svc", {
//   family:"hello-service",
//   executionRoleArn:"arn:aws:iam::872232775305:role/ecsTaskExecutionRole",
//   requiresCompatibilities :["FARGATE"],
//   networkMode: "awsvpc",
//   taskRoleArn:taskRole.arn,
//   containerDefinitions: JSON.stringify([
//     {
//       name:"hello-web",
//       image:"upadhyayyash/hello:web",
//       cpu: 500,
//       memory:512,
//       essential:true,
//       portMappings: [
//         {
//           containerPort: 80
//         },
//       ],
//     },
//     {
//       name:"hello-v2",
//       image:"mgdevstack/hello:web-v0.0.2",
//       cpu: 500,
//       memory:512,
//       essential:true,
//       portMappings: [
//         {
//           containerPort: 80
//         },
//       ]
//     }
//   ])
// });
//const myservice = new awsx.ecs.FargateService("myservice", {
  //     cluster:myCluster.arn,
  //     networkConfiguration: {
  //         subnets: vpc.privateSubnetIds,
  //         securityGroups: [securityGroup.id],
  //     },
  //     desiredCount: 2,
  //     taskDefinitionArgs: {
  //         container: {
  //             image: "nginx:latest",
  //             cpu: 512,
  //             memory: 128,
  //             essential: true,
  //         },
  //     },
  // });
// const load_balancer = new awsx.lb.ApplicationLoadBalancer("load_balancer",{
//   co
// })
// const vpcid = vpc.id as unknown
// const subnet = aws.ec2.getSubnetIds({
//   vpcId:vpcid as string
// })
// const service = new aws.ecs.Service("service",{
//   desiredCount: 1,
//   cluster:myCluster.arn,
//   taskDefinition:aws_ecs_task_definition.arn,
//   launchType:"FARGATE",
//   networkConfiguration:{
//     subnets:<>,
//     assignPublicIp:true

//   },
//   load_balancer:{
//     target
//   }




// });
// const taskDefinition = pulumi
//   .all([image, logGroup.name, logGroup.namePrefix])
//   .apply(
//     ([img, logGroupName, nameprefix]) =>
//       new aws.ecs.TaskDefinition("taskdefinition", {
//         family: "ecs-anywhere",
//         requiresCompatibilities: ["EXTERNAL"],
//         taskRoleArn: taskRole.arn,
//         executionRoleArn: executionRole.arn,
//         containerDefinitions: JSON.stringify([
//           {
//             name: "app",
//             image: img,
//             cpu: 256,
//             memory: 256,
//             essential: true,
//             portMappings: [
//               {
//                 containerPort: 80,
//                 hostPort: 80,
//               },
//             ],
//             logConfiguration: {
//               logDriver: "awslogs",
//               options: {
//                 "awslogs-group": logGroupName,
//                 "awslogs-region": awsRegion,
//                 "awslogs-stream-prefixs": nameprefix,
//               },
//             },
//           },
//         ]),
//       }),
//   );
// 

// const logGroup = new aws.cloudwatch.LogGroup("logGroup");

// UserData for Droplets
// const userData = pulumi
//   .all([ssmActivation.activationCode, ssmActivation.id, cluster.name])
//   .apply(
//     ([activationCode, activationId, clusterName]) => `#!/bin/bash
// # Download the ecs-anywhere install Script
// curl -o "ecs-anywhere-install.sh" "https://amazon-ecs-agent-packages-preview.s3.us-east-1.amazonaws.com/ecs-anywhere-install.sh" && sudo chmod +x ecs-anywhere-install.sh

// # (Optional) Check integrity of the shell script
// curl -o "ecs-anywhere-install.sh.sha256" "https://amazon-ecs-agent-packages-preview.s3.us-east-1.amazonaws.com/ecs-anywhere-install.sh.sha256" && sha256sum -c ecs-anywhere-install.sh.sha256

// # Run the install script
// sudo ./ecs-anywhere-install.sh \
//     --cluster ${clusterName} \
//     --activation-id ${activationId} \
//     --activation-code ${activationCode} \
//     --region ${awsRegion}
// `,
//   );

// const loadBalancerTag = new digitalocean.Tag("lb");

// for (let i = 1; i <= numberNodes; i++) {
//   const droplet = new digitalocean.Droplet(`droplet-${i}`, {
//     region: digitalocean.Region.NYC1,
//     size: "s-1vcpu-2gb",
//     image: "ubuntu-20-04-x64",
//     userData: userData,
//     tags: [loadBalancerTag.id],
//   });
// }

// // Set up load balancer
// const lb = new digitalocean.LoadBalancer("lb", {
//   region: digitalocean.Region.NYC1,
//   forwardingRules: [
//     {
//       entryPort: 80,
//       entryProtocol: digitalocean.Protocol.HTTP,
//       targetPort: 80,
//       targetProtocol: digitalocean.Protocol.HTTP,
//     },
//   ],
//   healthcheck: {
//     port: 80,
//     protocol: digitalocean.Protocol.HTTP,
//     path: "/",
//   },
//   dropletTag: loadBalancerTag.name,
// });

// Create ECR repository and build and push docker image
// const repo = new awsx.ecr.Repository("app");

// const image = repo.buildAndPushImage("./app");

// Set up task definition
// const taskDefinition = pulumi
//   .all([image, logGroup.name, logGroup.namePrefix])
//   .apply(
//     ([img, logGroupName, nameprefix]) =>
//       new aws.ecs.TaskDefinition("taskdefinition", {
//         family: "ecs-anywhere",
//         requiresCompatibilities: ["EXTERNAL"],
//         taskRoleArn: taskRole.arn,
//         executionRoleArn: executionRole.arn,
//         containerDefinitions: JSON.stringify([
//           {
//             name: "app",
//             image: img,
//             cpu: 256,
//             memory: 256,
//             essential: true,
//             portMappings: [
//               {
//                 containerPort: 80,
//                 hostPort: 80,
//               },
//             ],
//             logConfiguration: {
//               logDriver: "awslogs",
//               options: {
//                 "awslogs-group": logGroupName,
//                 "awslogs-region": awsRegion,
//                 "awslogs-stream-prefixs": nameprefix,
//               },
//             },
//           },
//         ]),
//       }),
//   );

// // Deploy containers to droplets
// const service = new aws.ecs.Service("service", {
//   launchType: "EXTERNAL",
//   taskDefinition: taskDefinition.arn,
//   cluster: cluster.id,
//   desiredCount: numberNodes - 1,
// });

// export const ip = lb.ip;
