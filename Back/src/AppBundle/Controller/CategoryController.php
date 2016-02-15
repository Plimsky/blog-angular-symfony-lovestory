<?php

namespace AppBundle\Controller;

use Doctrine\ORM\Query;
use FOS\RestBundle\Controller\Annotations as Rest;
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

        $form = $this->createForm(CategoryType::class, $category);
        $form->handleRequest($request);

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

        if ($category !== null) {
            $em->remove($category);
            $em->flush();
        }

        return $category;
    }
}
