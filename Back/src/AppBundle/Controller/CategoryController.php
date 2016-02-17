<?php

namespace AppBundle\Controller;

use Doctrine\ORM\Query;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use FOS\RestBundle\Controller\FOSRestController;
use AppBundle\Entity\Category;
use AppBundle\Form\CategoryType;

/**
 * Category controller.
 *
 * @Rest\RouteResource("Category")
 */
class CategoryController extends FOSRestController
{
    /**
     * Lists all Category entities.
     *
     * @Rest\Get("/categories")
     * @Rest\View
     */
    public function indexAction()
    {
        $em         = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('AppBundle:Category')->findAll();

        // Can't get categories => 404 of course !
        if ($categories === null) {
            return new JsonResponse('No data found', 404);
        }

        return $categories;
    }

    /**
     * Creates a new Category entity.
     *
     * @param Request $request
     * @return Category
     *
     * @Rest\Post("/categories")
     * @Rest\View
     */
    public function newAction(Request $request)
    {
        $category = new Category();
        $form     = $this->createForm(CategoryType::class, $category);

        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($category);
            $em->flush();
        }
        else {
            // Can't create category => 409 of course ! (conflict)
            return new JsonResponse((string) $form->getErrors(true), 409);
        }

        return $category;
    }

    /**
     * Finds and displays a Category entity.
     *
     * @param $id
     * @return Category
     *
     * @Rest\Get("/categories/{id}")
     * @Rest\View
     */
    public function showAction($id)
    {
        $em       = $this->getDoctrine()->getManager();
        $category = $em->getRepository('AppBundle:Category')->find($id);

        // No category to get => 404 of course !
        if ($category === null) {
            return new JsonResponse('No data found', 404);
        }

        return $category;
    }

    /**
     * Displays a form to edit an existing Category entity.
     *
     * @param Request $request
     * @param $id
     * @return Category
     *
     * @Rest\Put("/categories/{id}")
     * @Rest\View
     */
    public function editAction(Request $request, $id)
    {
        $em       = $this->getDoctrine()->getManager();
        $category = $em->getRepository('AppBundle:Category')->find($id);

        $form = $this->createForm(CategoryType::class, $category, ['method' => 'PUT']);
        $form->handleRequest($request);

        // No category to edit => 404 of course !
        if ($category === null) {
            return new JsonResponse('No data found', 404);
        }

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($category);
            $em->flush();
        }

        return $category;
    }

    /**
     * Deletes a Category entity.
     *
     * @param $id
     * @return Category | null
     *
     * @Rest\Delete("/categories/{id}")
     * @Rest\View
     */
    public function deleteAction($id)
    {
        $em       = $this->getDoctrine()->getManager();
        $category = $em->getRepository('AppBundle:Category')->find($id);

        // No category to delete => 404 of course !
        if ($category === null) {
            return new JsonResponse('No data found', 404);
        }

        $em->remove($category);
        $em->flush();

        return $category;
    }
}
