<?php

namespace AppBundle\Controller;

use Doctrine\ORM\Query;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use AppBundle\Entity\Article;
use AppBundle\Form\ArticleType;

/**
 * Article controller.
 *
 * @Rest\RouteResource("Article")
 */
class ArticleController extends FOSRestController
{
    /**
     * Lists all Article entities.
     *
     * @return array
     *
     * @Rest\Get("/articles")
     * @Rest\View
     */
    public function indexAction()
    {
        $em       = $this->getDoctrine()->getManager();
        $articles = $em->getRepository('AppBundle:Article')->findAll();

        // Can't get articles => 404 of course !
        if ($articles === null) {
            return new JsonResponse('No data found', 404);
        }

        return $articles;
    }

    /**
     * Creates a new Article entity.
     *
     * @param Request $request
     * @return Article
     *
     * @Rest\Post("/articles")
     * @Rest\View
     */
    public function newAction(Request $request)
    {
        $article = new Article();
        $form    = $this->createForm(ArticleType::class, $article);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();
        } else {
            // Can't create article => 409 of course ! (conflict)
            return new JsonResponse((string)$form->getErrors(true), 409);
        }

        return $article;
    }

    /**
     * Finds and displays a Article entity.
     *
     * @param $id
     * @return Article
     *
     * @Rest\Get("/articles/{id}")
     * @Rest\View
     */
    public function showAction($id)
    {
        $em      = $this->getDoctrine()->getManager();
        /** Article $article */
        $article = $em->getRepository('AppBundle:Article')->find($id);

        // No article to get => 404 of course !
        if ($article === null) {
            return new JsonResponse('No data found', 404);
        }

        return $article;
    }

    /**
     * Displays a form to edit an existing Article entity.
     *
     * @param Request $request
     * @param $id
     * @return Article
     *
     * @Rest\Put("/articles/{id}")
     * @Rest\View
     */
    public function editAction(Request $request, $id)
    {
        $em      = $this->getDoctrine()->getManager();
        $article = $em->getRepository('AppBundle:Article')->find($id);

        $form = $this->createForm(ArticleType::class, $article, ['method' => 'PUT']);
        $form->handleRequest($request);

        // No article to edit => 404 of course !
        if ($article === null) {
            return new JsonResponse('No data found', 404);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($article);
            $em->flush();
        }

        return $article;
    }

    /**
     * Deletes a Article entity.
     *
     * @param $id
     * @return Article | null
     *
     * @Rest\Delete("/articles/{id}")
     * @Rest\View
     */
    public function deleteAction($id)
    {
        $em      = $this->getDoctrine()->getManager();
        $article = $em->getRepository('AppBundle:Article')->find($id);

        // No article to delete => 404 of course !
        if ($article === null) {
            return new JsonResponse('No data found', 404);
        }

        $em->remove($article);
        $em->flush();

        return $article;
    }
}